/**
 * UI Safety helpers: fixes "glass overlays stealing clicks" and
 * "buttons causing reloads".
 *
 * Use `DECORATIVE_LAYER` on any gradient/blur overlays.
 * Use `SAFE_BUTTON` on any non-submit button.
 */

export const DECORATIVE_LAYER =
  "pointer-events-none select-none";

export const CLICKABLE_LAYER =
  "pointer-events-auto";

export const SAFE_BUTTON =
  "active:scale-95 hover:shadow-lg transition";

export function attachUnloadDebug() {
  // Call in dev ONLY if you want to prove reload/unload is happening.
  if (import.meta.env.DEV) {
    window.addEventListener("beforeunload", () => {
      // eslint-disable-next-line no-console
      console.log("UNLOAD/RELOAD triggered (likely form submit or <a href>)");
    });
  }
}

