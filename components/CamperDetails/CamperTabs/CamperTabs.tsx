"use client";

import { Camper } from "@/types";
import { useState } from "react";
import css from "./CamperTabs.module.css";
import clsx from "clsx";
import { FeaturesList } from "../FeaturesList/FeaturesList";
import { ReviewsList } from "../ReviewsList/ReviewsList ";

interface camperTabsProps {
  camper: Camper;
}

type Tab = "features" | "reviews";

export default function CamperTabs({ camper }: camperTabsProps) {
  const [tab, setTab] = useState<Tab>("features");

  return (
    <section className={css.tabs}>
      <div className={css.tabButtons}>
        <button
          type="button"
          className={clsx(css.tabBtn, tab === "features" && css.tabBtnActive)}
          onClick={() => setTab("features")}
          aria-label="Features"
        >
          Features
        </button>
        <button
          type="button"
          className={clsx(css.tabBtn, tab === "reviews" && css.tabBtnActive)}
          onClick={() => setTab("reviews")}
          aria-label="Reviews"
        >
          Reviews
        </button>
      </div>
      <div className={css.tabContent}>
        {tab === "features" ? (
          <FeaturesList camper={camper} />
        ) : (
          <ReviewsList reviews={camper.reviews} />
        )}
      </div>
    </section>
  );
}
