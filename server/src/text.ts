// C0/C1 control characters plus bidi overrides and zero-width characters, which can be used to
// disguise text. Newlines are dropped too: chat is single-line.
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point.
const UNSAFE = /[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]/g;

/** Normalize user text for display. The result is still untrusted and must render as plain text. */
export function cleanText(input: string): string {
  return input.normalize("NFC").replace(UNSAFE, " ").replace(/\s+/g, " ").trim();
}
