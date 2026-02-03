# Workflow orchestrator (handoff playbook)

Use this guide to chain the custom agents in a predictable pipeline.

## Default sequence
1. Architecture lead
2. Renderer/web migration
3. Data & services
4. Pro feature removal
5. Testing & QA
6. Build & CI

## Handoff rules
- Each agent starts with a brief from the orchestrator.
- Each agent ends with:
  - Summary of changes
  - Files touched
  - Risks/assumptions
  - Suggested next agent

## Handoff template
- Goal:
- Scope:
- Constraints:
- Required files/areas:
- Risks/unknowns:
- Done when:

## Iteration loop
If a later agent reports issues:
- Route back to the agent best suited to fix it.
- Include exact file paths and failure details.

## Example invocation (conceptual)
- Invoke custom agent: workflow-orchestrator-agent
  - Provides handoff to architecture lead
- Invoke custom agent: architecture-lead-agent
  - Provides handoff to renderer-web-migration-agent
- Continue the sequence
