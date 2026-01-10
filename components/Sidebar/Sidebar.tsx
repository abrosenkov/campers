"use client";

import { useState } from "react";
import css from "./Sidebar.module.css";
import { useCamperStore, Filters } from "@/stores/useCamperStore";
import { Button } from "@/components/UI/Button/Button";
import { BooleanFilterKeys } from "@/types";
import { SIDEBAR_FEATURES, TYPE_CONFIG } from "@/lib/constants";

export default function Sidebar() {
  const { fetchCampers, isLoading } = useCamperStore();

  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [equipment, setEquipment] = useState<Record<string, boolean>>({
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  });

  const onSearch = () => {
    const apiFilters: Filters = {};
    const normalizedLocation = location.trim();

    if (normalizedLocation) apiFilters.location = normalizedLocation;
    if (form) apiFilters.form = form;

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
    <aside className={css.sidebar}>
      <div className={css.group}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
          <svg className={css.inputIcon} width={20} height={20}>
            <use href="/sprite.svg#map" />
          </svg>
          <input
            type="text"
            placeholder="City, Country"
            className={css.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <p className={css.filterTitle}>Filters</p>

      <div className={css.section}>
        <h3 className={css.sectionHeader}>Vehicle equipment</h3>
        <hr className={css.divider} />
        <div className={css.categoriesGrid}>
          {SIDEBAR_FEATURES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={equipment[item.id] ? css.itemActive : css.item}
              onClick={() =>
                setEquipment((prev) => ({
                  ...prev,
                  [item.id]: !prev[item.id],
                }))
              }
            >
              <svg width={32} height={32}>
                <use href={`/sprite.svg#${item.icon}`} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionHeader}>Vehicle type</h3>
        <hr className={css.divider} />
        <div className={css.categoriesGrid}>
          {TYPE_CONFIG.map((type) => (
            <button
              key={type.id}
              type="button"
              className={form === type.id ? css.itemActive : css.item}
              onClick={() =>
                setForm((prev) => (prev === type.id ? "" : type.id))
              }
            >
              <svg width={32} height={32}>
                <use href={`/sprite.svg#${type.icon}`} />
              </svg>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button className={css.searchBtn} onClick={onSearch} disabled={isLoading}>
        Search
      </Button>
    </aside>
  );
}
