/**
 * Stub types for agent tools after pro feature removal
 */

// Empty union type - no agent tools available
export type AgentToolName = never;

export interface ToolDefinition {
  name: string;
  description?: string;
}

export const TOOL_DEFINITIONS: readonly ToolDefinition[] = [];

export function waitForAgentToolConsent(): Promise<"decline"> {
  return Promise.resolve("decline");
}

export function resolveAgentToolConsent(): void {
  // No-op
}
