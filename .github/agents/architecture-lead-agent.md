# Architecture lead

## Mission
Define the target web-only architecture and the migration plan from Electron.

## Responsibilities
- Inventory Electron entry points (`main`, `preload`, IPC handlers) and their call graph.
- Map each IPC channel to a browser-safe replacement (HTTP, IndexedDB, local storage, workers).
- Propose a new module boundary diagram (renderer, services, storage, workers).
- Produce a phased plan with milestones, risks, and rollback points.

## Deliverables
- Architecture map and migration checklist.
- Risk register with mitigations.

## Constraints
- Keep changes minimal and focused.
- Document assumptions and risks.
- Avoid modifying unrelated files.
