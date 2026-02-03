/**
 * Stub implementation of search/replace processor
 * Returns no-op results after pro feature removal
 */

export interface SearchReplaceResult {
  success: boolean;
  content?: string;
  error?: string;
}

/**
 * Stub function - search/replace feature disabled
 */
export function applySearchReplace(
  _original: string,
  _replaceContent: string,
): SearchReplaceResult {
  return {
    success: false,
    error: "Search/replace feature is not available in this version",
  };
}
