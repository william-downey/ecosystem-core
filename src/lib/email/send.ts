import { readFileSync } from "fs";
import path from "path";
import { emailFlowMap } from "@/lib/spec";
import { logEmail } from "@/lib/backend/store";

export type EmailProfileName = keyof typeof emailFlowMap.profiles;

const TEMPLATE_DIR = path.join(process.cwd(), "email", "templates");

function interpolate(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

export function readTemplate(name: string) {
  return readFileSync(path.join(TEMPLATE_DIR, `${name}.html`), "utf8");
}

export function profileForTemplate(template: string) {
  for (const [profile, config] of Object.entries(emailFlowMap.profiles)) {
    if ((config.templates as string[]).includes(template)) {
      return { profile, provider: config.provider };
    }
  }
  return null;
}

export async function sendTemplatedEmail(input: {
  template: string;
  to: string;
  vars: Record<string, string>;
}) {
  const binding = profileForTemplate(input.template);
  if (!binding) {
    throw new Error(`No email profile binds template ${input.template}.`);
  }
  const html = interpolate(readTemplate(input.template), input.vars);
  const subjectMatch = html.match(/<title>([^<]+)<\/title>/i);
  const subject = subjectMatch?.[1] ?? input.template;
  const provider = binding.provider;
  let status = "mocked";

  if (provider === "Postmark" && process.env.POSTMARK_SERVER_TOKEN) {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN,
      },
      body: JSON.stringify({
        From: process.env.POSTMARK_FROM_EMAIL ?? "studio@example.com",
        To: input.to,
        Subject: subject,
        HtmlBody: html,
      }),
    });
    status = response.ok ? "sent" : `postmark_${response.status}`;
  } else if (provider === "Brevo" && process.env.BREVO_API_KEY) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_FROM_EMAIL ?? "signals@example.com",
          name: "USoD MG",
        },
        to: [{ email: input.to }],
        subject,
        htmlContent: html,
      }),
    });
    status = response.ok ? "sent" : `brevo_${response.status}`;
  }

  return logEmail({
    profile: binding.profile,
    provider,
    template: input.template,
    to: input.to,
    subject,
    status,
    payload: input.vars,
  });
}
