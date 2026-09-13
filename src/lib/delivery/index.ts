import { deliveryMap } from "@/lib/spec";
import { maintenanceAffects } from "@/lib/temporal";

function slugPart(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function masteringDropboxPath(input: {
  client_name: string;
  project_name: string;
}) {
  const root = deliveryMap.fifty_seven_mastering.dropbox.root_folder;
  const [client, project, deliverables] = deliveryMap.fifty_seven_mastering.dropbox.structure;
  return {
    root_folder: root,
    structure: [
      input.client_name || client,
      input.project_name || project,
      deliverables,
    ],
    path: `${root}/${input.client_name}/${input.project_name}/${deliverables}`,
  };
}

export function masteringSamplyProject(input: {
  client_name: string;
  project_name: string;
  job_id: string;
}) {
  const naming = deliveryMap.fifty_seven_mastering.samply.project_naming;
  const project = naming
    .replace("{client_name}", slugPart(input.client_name))
    .replace("{project_name}", slugPart(input.project_name))
    .replace("{job_id}", input.job_id);
  return {
    project_naming: project,
    link_usage: deliveryMap.fifty_seven_mastering.samply.link_usage,
    versioning: deliveryMap.fifty_seven_mastering.samply.versioning,
    link: `https://samply.app/p/${project}`,
  };
}

export function northernAfterlightDropboxPath(input: { project_name: string }) {
  const root = deliveryMap.northern_afterlight.dropbox.root_folder;
  const [project, release, archive] = deliveryMap.northern_afterlight.dropbox.structure;
  return {
    root_folder: root,
    samply_enabled: deliveryMap.northern_afterlight.samply.enabled,
    structure: [input.project_name || project, release, archive],
    paths: {
      release: `${root}/${input.project_name}/${release}`,
      archive: `${root}/${input.project_name}/${archive}`,
    },
  };
}

export function createMasteringDeliveryLinks(input: {
  client_name: string;
  project_name: string;
  job_id: string;
}) {
  if (maintenanceAffects("delivery")) {
    throw new Error("Delivery is paused during the Sunday 02:00–04:00 America/New_York maintenance window.");
  }
  const dropbox = masteringDropboxPath(input);
  const samply = masteringSamplyProject(input);
  return {
    dropbox_folder: dropbox.path,
    dropbox_link: `https://www.dropbox.com/scl/fo/${slugPart(input.job_id).toLowerCase()}`,
    samply_project: samply.project_naming,
    samply_link: samply.link,
    versioning: samply.versioning,
    link_usage: samply.link_usage,
  };
}
