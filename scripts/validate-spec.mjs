import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "spec");

const files = [
  "brand_directory.json",
  "blueprint.json",
  "governance_suite.json",
  "temporal_layers.json",
  "routing_architecture.json",
  "admin_tools_architecture.json",
  "supabase_schema.json",
  "cms_schema.json",
  "component_inventory.json",
  "integration_map.json",
  "automation_map.json",
  "email_flow_map.json",
  "delivery_map.json",
];

for (const file of files) {
  const json = JSON.parse(readFileSync(path.join(specDir, file), "utf8"));
  if (typeof json !== "object" || json === null) {
    throw new Error(`${file} is not an object`);
  }
}

const schema = JSON.parse(readFileSync(path.join(specDir, "supabase_schema.json"), "utf8")).supabase_schema;
const sql = readFileSync(path.join(root, "supabase/migrations/0001_backend_master_list.sql"), "utf8");

for (const moduleName of Object.keys(schema)) {
  for (const tableName of Object.keys(schema[moduleName].tables)) {
    if (!sql.includes(`create table if not exists ${tableName}`)) {
      throw new Error(`Missing table ${tableName} in SQL migration`);
    }
    for (const field of Object.keys(schema[moduleName].tables[tableName].fields)) {
      if (!sql.includes(`  ${field} `)) {
        throw new Error(`Missing field ${tableName}.${field} in SQL migration`);
      }
    }
  }
}

const components = JSON.parse(readFileSync(path.join(specDir, "component_inventory.json"), "utf8")).component_inventory;
const componentFiles = {
  ShellLayout: "src/components/ShellLayout.tsx",
  BrandSwitcher: "src/components/BrandSwitcher.tsx",
  NavBar: "src/components/NavBar.tsx",
  Footer: "src/components/Footer.tsx",
  ErrorBoundary: "src/components/ErrorBoundary.tsx",
  NALibraryGrid: "src/components/northern-afterlight/NALibraryGrid.tsx",
  NAProjectCard: "src/components/northern-afterlight/NAProjectCard.tsx",
  NAJournalEntry: "src/components/northern-afterlight/NAJournalEntry.tsx",
  NAHighlightBanner: "src/components/northern-afterlight/NAHighlightBanner.tsx",
  FSMIntakeForm: "src/components/fifty-seven-mastering/FSMIntakeForm.tsx",
  FSMJobStatusCard: "src/components/fifty-seven-mastering/FSMJobStatusCard.tsx",
  FSMDeliveryPanel: "src/components/fifty-seven-mastering/FSMDeliveryPanel.tsx",
  FSMPricingTable: "src/components/fifty-seven-mastering/FSMPricingTable.tsx",
  USSignalCard: "src/components/usod-mg/USSignalCard.tsx",
  USTimelineView: "src/components/usod-mg/USTimelineView.tsx",
  USLoreEntry: "src/components/usod-mg/USLoreEntry.tsx",
  FBExperimentCard: "src/components/fourth-brand/FBExperimentCard.tsx",
  FBLabPanel: "src/components/fourth-brand/FBLabPanel.tsx",
};

for (const name of Object.values(components).flat()) {
  const file = componentFiles[name];
  if (!file || !existsSync(path.join(root, file))) {
    throw new Error(`Missing component ${name}`);
  }
}

const templates = JSON.parse(readFileSync(path.join(specDir, "email_flow_map.json"), "utf8")).email_flow_map.profiles;
for (const profile of Object.values(templates)) {
  for (const template of profile.templates) {
    const file = path.join(root, "email/templates", `${template}.html`);
    if (!existsSync(file)) throw new Error(`Missing email template ${template}`);
  }
}

const scenarios = JSON.parse(readFileSync(path.join(specDir, "automation_map.json"), "utf8")).automation_map.scenarios;
for (const scenario of scenarios) {
  const file = path.join(root, "make/scenarios", `${scenario.name}.json`);
  if (!existsSync(file)) throw new Error(`Missing Make.com scenario ${scenario.name}`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  if (json.name !== scenario.name) throw new Error(`Scenario name mismatch ${scenario.name}`);
  if (json.source !== scenario.source) throw new Error(`Scenario source mismatch ${scenario.name}`);
  if (json.trigger !== scenario.trigger) throw new Error(`Scenario trigger mismatch ${scenario.name}`);
}

console.log("Spec validation passed.");
