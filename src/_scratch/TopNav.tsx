import React from "react";
import { SAFE_BUTTON } from "../lib/uiSafety";
import { Menu, User } from "lucide-react";

/**
 * Replace your existing top bar with this pattern (or patch yours):
 * - z-index high
 * - all buttons have type="button"
 * - no <a href> unless you truly intend a full navigation
 */

export default function TopNav({
  onMenu,
  onProfile,
  title = "Secret Heart Pocket",
}: {
  onMenu: () => void;
  onProfile: () => void;
  title?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-4">
      <div className="rounded-3xl bg-white/75 backdrop-blur-xl border border-white/60 shadow-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={onMenu}
            className={[
              "rounded-2xl px-3 py-2 bg-white/70 hover:bg-white shadow-sm hover:shadow",
              SAFE_BUTTON,
              "flex items-center gap-2 text-slate-800 font-bold",
            ].join(" ")}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
            Menu
          </button>

          <div className="flex-1 min-w-0">
            <div className="truncate text-slate-800 font-extrabold text-lg sm:text-xl">
              {title}
            </div>
            <div className="truncate text-slate-600 text-sm">
              Calm bedtime stories, safely.
            </div>
          </div>

          {/* "Orange profile" button */}
          <button
            type="button"
            onClick={onProfile}
            className={[
              "rounded-2xl px-3 py-2 bg-orange-500 text-white shadow-md hover:shadow-lg",
              SAFE_BUTTON,
              "flex items-center gap-2 font-extrabold",
            ].join(" ")}
            aria-label="Open profile"
          >
            <User className="h-5 w-5" />
            Profile
          </button>
        </div>
      </div>
    </header>
  );
}

