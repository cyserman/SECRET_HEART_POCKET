/**
 * Gentle story-friendly cleanup
 * NO rewriting voice
 * NO semantic changes
 * SAFE + deterministic
 */

export function normalizeWhitespace(input: string): string {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function tidyPunctuation(input: string): string {
  let s = input;

  s = s.replace(/\s+([,.;:!?])/g, "$1");
  s = s.replace(/([,.;:!?])([A-Za-z0-9])/g, "$1 $2");
  s = s.replace(/([!?]){2,}/g, "$1");
  s = s.replace(/\.{4,}/g, "...");

  return s;
}

export function gentlePolish(input: string): string {
  let s = input;
  s = normalizeWhitespace(s);
  s = tidyPunctuation(s);
  return s;
}
