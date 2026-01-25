"use client";

import css from "./MobileFilters.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <div className={css.mobileFilters}>
      <div className={css.buttonWrapper}>
        <button
          className={css.filtersButton}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open filters"
        >
          <svg
            className={open ? css.filterIconOpen : css.filtersIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16" stroke="currentColor" strokeWidth="2" />
            <path d="M7 12h10" stroke="currentColor" strokeWidth="2" />
            <path d="M10 18h4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className={`${css.filtersPanel} ${open ? css.open : ""}`}>
        <Sidebar closeFilters={() => setOpen(false)} />
      </div>
    </div>
  );
}
