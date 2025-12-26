import React from "react";
import { DECORATIVE_LAYER, CLICKABLE_LAYER } from "../lib/uiSafety";

/**
 * If you currently have always-on top/bottom glass "windows",
 * move them into this component and ensure:
 * - Decorative layers are pointer-events-none
 * - Actual nav/buttons are pointer-events-auto + high z-index
 *
 * If you already have a layout file, you can copy these patterns into it.
 */

export default function AppChrome({
  topNav,
  children,
  bottomBar,
}: {
  topNav?: React.ReactNode;
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 relative">
      {/* Decorative top glass overlay (DOES NOT EAT CLICKS) */}
      <div
        className={[
          "fixed top-0 inset-x-0 h-24 sm:h-28",
          "bg-white/35 backdrop-blur-xl",
          "border-b border-white/40",
          DECORATIVE_LAYER,
          "z-10",
        ].join(" ")}
      />

      {/* Top nav (DOES accept clicks) */}
      {topNav && (
        <div className={["fixed top-0 inset-x-0", CLICKABLE_LAYER, "z-[100]"].join(" ")}>
          {topNav}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-20 pt-24 sm:pt-28 pb-24">
        {children}
      </div>

      {/* Decorative bottom glass overlay (DOES NOT EAT CLICKS) */}
      <div
        className={[
          "fixed bottom-0 inset-x-0 h-20 sm:h-24",
          "bg-white/35 backdrop-blur-xl",
          "border-t border-white/40",
          DECORATIVE_LAYER,
          "z-10",
        ].join(" ")}
      />

      {/* Bottom bar (clickable) */}
      {bottomBar && (
        <div className={["fixed bottom-0 inset-x-0", CLICKABLE_LAYER, "z-[100]"].join(" ")}>
          {bottomBar}
        </div>
      )}
    </div>
  );
}

