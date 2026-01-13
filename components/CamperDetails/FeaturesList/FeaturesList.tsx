"use client";

import { Camper } from "@/types";
import css from "./FeaturesList.module.css";
import { CAMPER_FEATURES, DETAILS_KEYS, DETAILS_LABELS } from "@/lib/constants";
import { Badge } from "@/components/UI/Badge/Badge";

interface FeaturesListProps {
  camper: Camper;
}

export function FeaturesList({ camper }: FeaturesListProps) {
  return (
    <div className={css.featuresWrapper}>
      <div className={css.badges}>
        {CAMPER_FEATURES.map(({ id, icon, label }) => {
          const value = camper[id];

          if (!value) return null;

          const displayText =
            label || (typeof value === "string" ? value : String(value));

          return <Badge key={id} iconId={icon} text={displayText} />;
        })}
      </div>
      <div className={css.vehicleDetails}>
        <h2 className={css.detailsTitle}>Vehicle details</h2>
        <ul className={css.detailsList}>
          {DETAILS_KEYS.map((key) => {
            const value = camper[key as keyof Camper];

            if (!value) return null;
            return (
              <li key={key} className={css.detailItem}>
                <span>{DETAILS_LABELS[key]}</span>
                <span>{String(value)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
