# Architecture Migration: Pro Feature Removal

## Executive Summary
This document outlines the removal of all pro features from the Dyad codebase located under `src/pro/`. The goal is to maintain a functional application while eliminating pro-gated functionality.

## Current Architecture

### Pro Feature Inventory

#### Directory Structure
```
src/pro/
├── main/
│   ├── ipc/
│   │   ├── handlers/
│   │   │   ├── local_agent/        # Local AI agent with 20+ tools
│   │   │   ├── themes_handlers.ts  # Theme management
│   │   │   └── visual_editing_handlers.ts  # Visual editing features
│   │   └── processors/
│   │       └── search_replace_processor.ts  # Search/replace DSL processor
│   ├── prompts/
│   │   └── turbo_edits_v2_prompt.ts  # Advanced editing prompt
│   └── utils/
│       └── visual_editing_utils.ts   # Visual editing utilities
├── shared/
│   ├── search_replace_parser.ts    # Parser for search/replace blocks
│   └── search_replace_markers.ts   # Marker utilities
└── ui/
    └── components/
        └── Annotator/              # Visual annotation component
            ├── Annotator.tsx
            └── AnnotationCanvas.tsx

Total: 46 files, ~8,494 lines of code
```

#### Pro Features
1. **Local Agent (AI Assistant)**: Autonomous agent with 20+ tools
   - File operations: write, edit, delete, rename, read
   - Code operations: search_replace, grep, code_search, run_type_checks
   - Integration: add_dependency, add_integration
   - Database: execute_sql, get_supabase_project_info, get_supabase_table_schema
   - Web: web_search, web_crawl
   - Misc: set_chat_summary, update_todos, read_logs

2. **Visual Editing**: Component selection and annotation
   - Annotator UI component
   - Visual editing handlers
   - Screenshot-based editing

3. **Themes**: Advanced theme management

4. **Turbo Edits V2**: Enhanced editing system with search/replace DSL

### Dependency Graph

#### Files Importing from `src/pro/`

**Main Process:**
- `src/main.ts` → `pro/main/ipc/handlers/local_agent/ai_messages_cleanup`
- `src/ipc/ipc_host.ts` → 3 handlers:
  - `pro/main/ipc/handlers/themes_handlers`
  - `pro/main/ipc/handlers/visual_editing_handlers`
  - `pro/main/ipc/handlers/local_agent/agent_tool_handlers`

**Prompts:**
- `src/prompts/system_prompt.ts` → `pro/main/prompts/turbo_edits_v2_prompt`

**Handlers:**
- `src/ipc/handlers/chat_stream_handlers.ts` → `pro/main/ipc/handlers/local_agent/local_agent_handler`
- `src/ipc/processors/response_processor.ts` → `pro/main/ipc/processors/search_replace_processor`

**UI Components:**
- `src/components/chat/DyadSearchReplace.tsx` → `pro/shared/search_replace_parser`
- `src/components/preview_panel/PreviewIframe.tsx` → `pro/ui/components/Annotator/Annotator`

**Hooks:**
- `src/hooks/useAgentTools.ts` → `pro/main/ipc/handlers/local_agent/tool_definitions`

**Tests:**
- `src/__tests__/local_agent_handler.test.ts`
- `src/__tests__/prepare_step_utils.test.ts`
- `src/__tests__/ai_messages_cleanup.test.ts`
- `src/__tests__/local_agent_list_files_path_safety.test.ts`

## Target Architecture

### Post-Migration Structure
```
src/
├── main.ts                          # No pro imports
├── ipc/
│   ├── ipc_host.ts                  # Remove pro handler registrations
│   ├── handlers/
│   │   └── chat_stream_handlers.ts  # Stub local agent calls
│   └── processors/
│       └── response_processor.ts     # Stub search/replace
├── prompts/
│   └── system_prompt.ts              # Remove turbo edits prompt
├── components/
│   ├── chat/
│   │   └── DyadSearchReplace.tsx     # Stub or simplify parser
│   └── preview_panel/
│       └── PreviewIframe.tsx         # Remove annotator
├── hooks/
│   └── useAgentTools.ts              # Return empty tools
└── __tests__/                        # Update or remove pro tests
```

### Removed Functionality
1. ✗ Local Agent with all 20+ tools
2. ✗ Visual editing and annotation
3. ✗ Theme management handlers
4. ✗ Turbo Edits V2 prompt system
5. ✗ Search/replace DSL processor (advanced)
6. ✗ AI messages cleanup utilities

### Retained Functionality
1. ✓ Basic chat functionality
2. ✓ Standard file operations (via non-pro paths)
3. ✓ App preview
4. ✓ Basic search/replace display (stub)
5. ✓ Settings and configuration

## Migration Plan

### Phase 1: Stub External Dependencies (Minimal Changes)
**Goal**: Replace pro imports with stubs to maintain compilation

1. **Create stub modules**:
   - `src/stubs/search_replace_parser.ts` (minimal parser)
   - `src/stubs/search_replace_processor.ts` (no-op processor)
   - `src/stubs/agent_tools.ts` (empty types)
   - `src/stubs/annotator.tsx` (empty component)

2. **Update imports** (14 files):
   - Replace `@/pro/shared/*` → `@/stubs/*`
   - Replace `@/pro/main/*` → `@/stubs/*`
   - Replace `@/pro/ui/*` → `@/stubs/*`

3. **Remove handler registrations** (`src/ipc/ipc_host.ts`):
   - Comment out `registerThemesHandlers()`
   - Comment out `registerVisualEditingHandlers()`
   - Comment out `registerAgentToolHandlers()`

4. **Stub main.ts cleanup**:
   - Remove `cleanupOldAiMessagesJson()` call

### Phase 2: Delete Pro Directory
**Goal**: Remove all pro feature code

1. **Delete**: `rm -rf src/pro/`

2. **Verify**: No broken imports remain

### Phase 3: Clean Up Tests
**Goal**: Remove or update pro-related tests

1. **Delete pro tests**:
   - `src/__tests__/local_agent_handler.test.ts`
   - `src/__tests__/prepare_step_utils.test.ts`
   - `src/__tests__/ai_messages_cleanup.test.ts`
   - `src/__tests__/local_agent_list_files_path_safety.test.ts`

2. **Update test configs** if needed

### Phase 4: Verification
**Goal**: Ensure app still builds and runs

1. **Build test**: `npm run ts` (TypeScript check)
2. **Lint**: `npm run lint`
3. **Unit tests**: `npm test` (skip if npm install broken)
4. **Manual smoke test**: Verify basic chat works

## Risk Register

### High-Risk Items

| Risk | Impact | Likelihood | Mitigation | Rollback |
|------|--------|-----------|------------|----------|
| **Search/replace display breaks** | Chat UI fails to render search/replace blocks | Medium | Implement simple stub parser that extracts search/replace blocks | Restore parseSearchReplaceBlocks from pro/shared |
| **Local agent calls crash chat** | Chat streaming fails when agent mode enabled | High | Stub handleLocalAgentStream to return graceful error | Restore local_agent_handler.ts |
| **Type errors from missing types** | Build fails due to AgentToolName, etc. | High | Create stub type definitions in @/stubs/ | Quick type definition additions |
| **Annotator removal breaks preview** | Preview panel crashes without Annotator | Low | Conditional render, stub component | Add empty Annotator stub |

### Medium-Risk Items

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| **Theme handlers break settings** | Theme-related settings fail | Low | Theme handlers likely isolated |
| **Visual editing button breaks** | UI element errors in preview | Low | Conditional rendering already in place |
| **Test suite fails** | CI/CD breaks | Medium | Update/remove affected tests |
| **Missing cleanup causes DB bloat** | ai_messages_json table grows | Low | Can be addressed later if needed |

### Low-Risk Items

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| **Turbo edits prompt removal** | Slightly different AI behavior | High | Standard prompt remains |
| **Build config needs update** | Minor tsconfig/build changes | Low | Verify build still works |

## Rollback Strategy

### Per-Phase Rollback

1. **Phase 1 Rollback**: Revert stub imports, restore original imports
   - Time: < 5 minutes
   - Impact: None

2. **Phase 2 Rollback**: `git checkout src/pro/`
   - Time: < 1 minute  
   - Impact: Restore all pro features

3. **Phase 3 Rollback**: Restore test files from git
   - Time: < 2 minutes
   - Impact: Tests run again

### Emergency Rollback
```bash
git checkout HEAD -- src/pro/
git checkout HEAD -- src/main.ts src/ipc/ipc_host.ts
git checkout HEAD -- src/prompts/system_prompt.ts
git checkout HEAD -- src/components/
git checkout HEAD -- src/hooks/
git checkout HEAD -- src/__tests__/
```

## Success Criteria

- [ ] TypeScript compilation succeeds (`npm run ts`)
- [ ] Linting passes (`npm run lint`)
- [ ] No import errors referencing `src/pro/`
- [ ] Basic chat functionality works
- [ ] App preview still functions
- [ ] Settings can be modified
- [ ] Application launches without crashes

## Timeline

- **Phase 1**: 30 minutes (stub creation + import updates)
- **Phase 2**: 5 minutes (directory deletion)
- **Phase 3**: 15 minutes (test cleanup)
- **Phase 4**: 20 minutes (verification)
- **Total**: ~70 minutes

## Notes

- npm install currently fails (ripgrep 403), so cannot install new dependencies
- Focus on minimal changes to existing code
- Stub implementations should be simple and safe (no-ops or empty returns)
- Preserve all non-pro functionality
- Document any behavior changes
