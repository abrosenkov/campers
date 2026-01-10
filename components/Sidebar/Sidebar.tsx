"use client";

import { useState } from "react";
import css from "./Sidebar.module.css";
import { useCamperStore, Filters } from "@/stores/useCamperStore";
import { Button } from "@/components/UI/Button/Button";
import { BooleanFilterKeys } from "@/types";
import { SIDEBAR_FEATURES, TYPE_CONFIG } from "@/lib/constants";
import clsx from "clsx";

export default function Sidebar() {
  const { fetchCampers, isLoading } = useCamperStore();

  const [location, setLocation] = useState("");
  const [formType, setFormType] = useState("");
  const [equipment, setEquipment] = useState<Record<string, boolean>>({
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiFilters: Filters = {};
    const normalizedLocation = location.trim();

    if (normalizedLocation) apiFilters.location = normalizedLocation;
    if (formType) apiFilters.form = formType;

    Object.entries(equipment).forEach(([key, value]) => {
      if (!value) return;

      if (key === "transmission") {
        apiFilters.transmission = "automatic";
      } else {
        apiFilters[key as BooleanFilterKeys] = true;
      }
    });

    fetchCampers(apiFilters);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.LocationSection}>
        <label htmlFor="location" className={css.locationLabel}>
          Location
        </label>
        <div className={css.inputWrapper}>
          <svg className={css.inputIcon} width={20} height={20}>
            <use href="/sprite.svg#map" />
          </svg>
          <input
            id="location"
            type="text"
            placeholder="City"
            className={css.locationInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={css.FilterSection}>
        <p className={css.filterTitle}>Filters</p>

        <div className={css.FilterGroup}>
          <h3 className={css.groupTitle}>Vehicle equipment</h3>
          <hr className={css.line} />
          <div className={css.categoriesGrid}>
            {SIDEBAR_FEATURES.map((item) => (
              <label
                key={item.id}
                className={clsx(
                  css.item,
                  equipment[item.id] ? css.itemActive : ""
                )}
              >
                <input
                  type="checkbox"
                  className={css.visuallyHidden}
                  checked={equipment[item.id]}
                  onChange={() =>
                    setEquipment((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }))
                  }
                />
                <svg width={32} height={32}>
                  <use href={`/sprite.svg#${item.icon}`} />
                </svg>
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={css.FilterGroup}>
          <h3 className={css.groupTitle}>Vehicle type</h3>
          <hr className={css.line} />
          <div className={css.categoriesGrid}>
            {TYPE_CONFIG.map((type) => (
              <label
                key={type.id}
                className={clsx(
                  css.item,
                  formType === type.id ? css.itemActive : ""
                )}
              >
                <input
                  type="radio"
                  name="vehicleType"
                  className={css.visuallyHidden}
                  checked={formType === type.id}
                  onClick={() => {
                    setFormType((prev) => (prev === type.id ? "" : type.id));
                  }}
                  onChange={() => {}}
                />
                <svg width={32} height={32}>
                  <use href={`/sprite.svg#${type.icon}`} />
                </svg>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button
        aria-label="Search"
        className={css.searchBtn}
        type="submit"
        disabled={isLoading}
      >
        Search
      </Button>
    </form>
  );
}
