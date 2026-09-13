import brandDirectorySpec from "../../spec/brand_directory.json";
import blueprintSpec from "../../spec/blueprint.json";
import governanceSpec from "../../spec/governance_suite.json";
import temporalSpec from "../../spec/temporal_layers.json";
import routingSpec from "../../spec/routing_architecture.json";
import adminToolsSpec from "../../spec/admin_tools_architecture.json";
import supabaseSchemaSpec from "../../spec/supabase_schema.json";
import cmsSchemaSpec from "../../spec/cms_schema.json";
import componentInventorySpec from "../../spec/component_inventory.json";
import integrationMapSpec from "../../spec/integration_map.json";
import automationMapSpec from "../../spec/automation_map.json";
import emailFlowMapSpec from "../../spec/email_flow_map.json";
import deliveryMapSpec from "../../spec/delivery_map.json";

export const brandDirectory = brandDirectorySpec.brand_directory;
export const blueprint = blueprintSpec.blueprint;
export const governanceSuite = governanceSpec.governance_suite;
export const temporalLayers = temporalSpec.temporal_layers;
export const routingArchitecture = routingSpec.routing_architecture;
export const adminToolsArchitecture = adminToolsSpec.admin_tools_architecture;
export const supabaseSchema = supabaseSchemaSpec.supabase_schema;
export const cmsSchema = cmsSchemaSpec.cms_schema;
export const componentInventory = componentInventorySpec.component_inventory;
export const integrationMap = integrationMapSpec.integration_map;
export const automationMap = automationMapSpec.automation_map;
export const emailFlowMap = emailFlowMapSpec.email_flow_map;
export const deliveryMap = deliveryMapSpec.delivery_map;

export const specs = {
  brand_directory: brandDirectorySpec,
  blueprint: blueprintSpec,
  governance_suite: governanceSpec,
  temporal_layers: temporalSpec,
  routing_architecture: routingSpec,
  admin_tools_architecture: adminToolsSpec,
  supabase_schema: supabaseSchemaSpec,
  cms_schema: cmsSchemaSpec,
  component_inventory: componentInventorySpec,
  integration_map: integrationMapSpec,
  automation_map: automationMapSpec,
  email_flow_map: emailFlowMapSpec,
  delivery_map: deliveryMapSpec,
} as const;
