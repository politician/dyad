# Workflow example (web-only + no-pro)

## Request
“Convert this Electron app to a web-only app and remove pro features.”

## Step 1: Orchestrator
- Produces handoff for architecture lead

## Step 2: Architecture lead
- Maps Electron entry points, IPC, and dependencies
- Outputs target web architecture and migration plan
- Hands off to renderer/web migration

## Step 3: Renderer/web migration
- Replaces IPC usage with browser APIs
- Keeps TanStack Router and Query structures
- Hands off to data & services

## Step 4: Data & services
- Replaces SQLite/Drizzle usage
- Defines service interfaces and storage strategy
- Hands off to pro feature removal

## Step 5: Pro feature removal
- Deletes `src/pro` and gating logic
- Updates docs for no-pro fork
- Hands off to testing & QA

## Step 6: Testing & QA
- Updates tests for web-only build
- Ensures pro features are not exposed
- Hands off to build & CI

## Step 7: Build & CI
- Switches to web-only build pipelines
- Removes Electron packaging/signing
- Final review or loop back if issues
