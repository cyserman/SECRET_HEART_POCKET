import React from "react";
import { SAFE_BUTTON } from "../lib/uiSafety";

/**
 * If your Legacy Mode page has buttons that "close" the app,
 * the most common causes are:
 * - <button> defaulting to type="submit" inside a form (reload)
 * - <a href> causing full page navigation
 *
 * This component hardens against both by:
 * - using type="button"
 * - requiring onClick handlers (SPA navigation)
 */

export default function LegacyModeUnlock({
  onBack,
  onActivateNow,
  onLearnMore,
  onRestore,
}: {
  onBack: () => void;
  onActivateNow: () => void;
  onLearnMore: () => void;
  onRestore: () => void;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl bg-white/75 backdrop-blur-xl border border-white/60 shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Legacy Mode</h1>
          <p className="mt-3 text-slate-600">
            Preserve stories long-term with extra protections and family continuity.
          </p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={onActivateNow}
              className={[
                "w-full rounded-3xl px-6 py-5 bg-indigo-600 text-white font-extrabold text-lg",
                "shadow-md hover:shadow-lg",
                SAFE_BUTTON,
              ].join(" ")}
            >
              Activate Now
            </button>

            <button
              type="button"
              onClick={onLearnMore}
              className={[
                "w-full rounded-3xl px-6 py-5 bg-white text-slate-900 font-extrabold text-lg",
                "shadow-md hover:shadow-lg",
                SAFE_BUTTON,
              ].join(" ")}
            >
              Learn More
            </button>

            <button
              type="button"
              onClick={onRestore}
              className={[
                "w-full rounded-3xl px-6 py-5 bg-white text-slate-900 font-extrabold text-lg",
                "shadow-md hover:shadow-lg",
                SAFE_BUTTON,
              ].join(" ")}
            >
              Restore Purchase
            </button>

            <button
              type="button"
              onClick={onBack}
              className={[
                "w-full rounded-3xl px-6 py-4 bg-white/70 text-slate-700 font-bold",
                "shadow-sm hover:shadow-md",
                SAFE_BUTTON,
              ].join(" ")}
            >
              Back
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Tip: If any of these buttons previously "closed" the app, it was likely a full reload.
            This page uses non-submit buttons to prevent that.
          </p>
        </div>
      </div>
    </main>
  );
}

