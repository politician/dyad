---
name: renderer-web-migration
description: Converts the renderer to a pure web build without Electron preload or IPC.
---

# Renderer/web migration

## Mission
Convert the renderer to a pure web build without Electron preload or IPC.

## Responsibilities
- Replace IPC usage with browser-friendly APIs (HTTP, IndexedDB, local storage).
- Preserve React + TanStack Router structure and routes.
- Keep data fetching in TanStack Query with centralized keys in `src/lib/queryKeys.ts`.
- Provide web alternatives for Electron-only UI affordances (file dialogs, window controls).

## Deliverables
- Renderer bootstrapping changes for web-only build.
- IPC replacement plan per feature area.

## Constraints
- Keep changes minimal and focused.
- Document assumptions and risks.
- Avoid modifying unrelated files.
