import { automationMap } from "@/lib/spec";
import { createMasteringDeliveryLinks } from "@/lib/delivery";
import { sendTemplatedEmail } from "@/lib/email/send";
import {
  getClient,
  getJob,
  logAutomationTrigger,
  updateJob,
} from "@/lib/backend/store";
import { isRushMode, isSignalWindow, maintenanceAffects } from "@/lib/temporal";
import { assertAutomationTriggerSource } from "@/lib/governance";
import type { Job, Signal } from "@/lib/backend/types";

type ScenarioName = (typeof automationMap.scenarios)[number]["name"];

function scenarioByName(name: ScenarioName) {
  const scenario = automationMap.scenarios.find((entry) => entry.name === name);
  if (!scenario) throw new Error(`Unknown scenario ${name}`);
  return scenario;
}

function matchesConditions(
  conditions: Record<string, unknown>,
  payload: Record<string, unknown>,
) {
  return Object.entries(conditions).every(([key, value]) => payload[key] === value);
}

async function maybeForwardToMake(scenario: string, payload: Record<string, unknown>) {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) return { forwarded: false };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario, payload }),
  });
  return { forwarded: response.ok, status: response.status };
}

export async function runJobCreated(job: Job) {
  const scenario = scenarioByName("mastering_intake_confirmation");
  assertAutomationTriggerSource(scenario.source);
  if (maintenanceAffects("automation")) {
    return { skipped: "maintenance_window", scenario: scenario.name };
  }
  const payload = { brand: job.brand, status: job.status, job_id: job.id, rush: job.rush };
  if (!matchesConditions(scenario.conditions, payload)) {
    return { skipped: "conditions", scenario: scenario.name };
  }
  const client = getClient(job.client_id);
  const actions: string[] = [];
  for (const action of scenario.actions) {
    if (action === "send_email:intake_confirmation" && client) {
      await sendTemplatedEmail({
        template: "fsm_intake_confirmation",
        to: client.email,
        vars: {
          client_name: client.name,
          project_name: String(job.intake_form_data.project_name ?? ""),
          job_id: job.id,
        },
      });
      actions.push(action);
      if (isRushMode(job)) {
        await sendTemplatedEmail({
          template: "fsm_status_update",
          to: client.email,
          vars: {
            client_name: client.name,
            project_name: String(job.intake_form_data.project_name ?? ""),
            job_id: job.id,
            status: job.status,
          },
        });
        actions.push("send_email:status_update:rush_mode");
      }
    }
    if (action === "log_event:automation_triggers") {
      logAutomationTrigger({
        source: scenario.source,
        event_type: scenario.trigger,
        payload,
        meta: { scenario: scenario.name },
      });
      actions.push(action);
    }
  }
  await maybeForwardToMake(scenario.name, payload);
  return { scenario: scenario.name, actions };
}

export async function runJobStatusChanged(job: Job) {
  const scenario = scenarioByName("mastering_delivery_ready");
  assertAutomationTriggerSource(scenario.source);
  if (maintenanceAffects("automation") || maintenanceAffects("delivery")) {
    return { skipped: "maintenance_window", scenario: scenario.name };
  }
  const payload = { brand: job.brand, status: job.status, job_id: job.id };
  if (!matchesConditions(scenario.conditions, payload)) {
    return { skipped: "conditions", scenario: scenario.name };
  }
  const client = getClient(job.client_id);
  const projectName = String(job.intake_form_data.project_name ?? "Project");
  const actions: string[] = [];
  let deliveryLinks = job.delivery_links;
  for (const action of scenario.actions) {
    if (action === "create_dropbox_folder" || action === "create_samply_link") {
      deliveryLinks = createMasteringDeliveryLinks({
        client_name: client?.name ?? "Client",
        project_name: projectName,
        job_id: job.id,
      });
      actions.push(action);
    }
    if (action === "update_job_delivery_links") {
      updateJob(job.id, { delivery_links: deliveryLinks });
      actions.push(action);
    }
    if (action === "send_email:delivery_ready" && client) {
      await sendTemplatedEmail({
        template: "fsm_delivery_ready",
        to: client.email,
        vars: {
          client_name: client.name,
          project_name: projectName,
          job_id: job.id,
          dropbox_folder: String(deliveryLinks.dropbox_folder ?? ""),
          samply_link: String(deliveryLinks.samply_link ?? ""),
        },
      });
      actions.push(action);
    }
  }
  logAutomationTrigger({
    source: scenario.source,
    event_type: scenario.trigger,
    payload: { ...payload, delivery_links: deliveryLinks },
    meta: { scenario: scenario.name },
  });
  await maybeForwardToMake(scenario.name, payload);
  return { scenario: scenario.name, actions, delivery_links: deliveryLinks };
}

export async function runSignalCreated(signal: Signal) {
  const scenario = scenarioByName("meta_signal_broadcast");
  assertAutomationTriggerSource(scenario.source);
  if (maintenanceAffects("automation")) {
    return { skipped: "maintenance_window", scenario: scenario.name };
  }
  const payload = { brand: signal.brand, active: signal.active, signal_id: signal.id };
  if (!matchesConditions(scenario.conditions, payload)) {
    return { skipped: "conditions", scenario: scenario.name };
  }
  logAutomationTrigger({
    source: scenario.source,
    event_type: scenario.trigger,
    payload,
    meta: { scenario: scenario.name },
  });
  if (isSignalWindow(signal)) {
    const title = String(signal.payload.title ?? "Signal");
    const body = String(signal.payload.body ?? "");
    if (process.env.SIGNAL_BROADCAST_EMAIL) {
      await sendTemplatedEmail({
        template: "us_signal_notification",
        to: process.env.SIGNAL_BROADCAST_EMAIL,
        vars: { title, body, signal_id: signal.id },
      });
    }
  }
  await maybeForwardToMake(scenario.name, payload);
  return { scenario: scenario.name, actions: ["log_event:automation_triggers"] };
}

export async function dispatchAutomation(event: {
  source: string;
  event_type: string;
  entity_id: string;
}) {
  if (event.event_type === "job_created") {
    const job = getJob(event.entity_id);
    if (!job) return { error: "job_not_found" };
    return runJobCreated(job);
  }
  if (event.event_type === "job_status_changed") {
    const job = getJob(event.entity_id);
    if (!job) return { error: "job_not_found" };
    return runJobStatusChanged(job);
  }
  if (event.event_type === "signal_created") {
    const { getSignal } = await import("@/lib/backend/store");
    const signal = getSignal(event.entity_id);
    if (!signal) return { error: "signal_not_found" };
    return runSignalCreated(signal);
  }
  return { error: "unhandled_event" };
}
