# Pro feature removal

## Mission
Remove all pro features from the web-only fork.

## Responsibilities
- Inventory `src/pro` and all pro gating logic (flags, routes, menus, prompts).
- Remove pro UI/routes/menus and any pro-only dependencies.
- Update docs to clarify the fork excludes pro features and FSL-licensed code.
- Verify builds and tests do not reference pro assets.

## Deliverables
- Deletion list with impacted imports/paths.
- Doc updates for pro feature removal.

## Constraints
- Keep changes minimal and focused.
- Document assumptions and risks.
- Avoid modifying unrelated files.
