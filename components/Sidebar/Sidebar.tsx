"use client";

import css from "./Sidebar.module.css";
import { useCamperStore } from "@/stores/useCamperStore";
import { useState } from "react";
import { Button } from "../UI/Button/Button";

const INITIAL_FILTERS = {
  location: "",
  form: "",
  transmission: "",
  AC: false,
  kitchen: false,
  TV: false,
  bathroom: false,
};

export default function Sidebar() {
  const { fetchCampers, isLoading } = useCamperStore();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleCheckboxChange = (name: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof INITIAL_FILTERS],
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      form: prev.form === value ? "" : value,
    }));
  };

  const onSearch = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== "" && value !== false
      )
    );

    fetchCampers(activeFilters, true);
  };
  return (
    <div>
      <div className={css.sidebar}>
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
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </div>
        </div>

        <p className={css.filterTitle}>Filters</p>

        <div className={css.section}>
          <h3 className={css.sectionHeader}>Vehicle equipment</h3>
          <hr className={css.divider} />
          <div className={css.categoriesGrid}>
            <button
              type="button"
              className={filters.AC ? css.itemActive : css.item}
              onClick={() => handleCheckboxChange("AC")}
            >
              <svg width={32} height={32}>
                <use href="/sprite.svg#wind" />
              </svg>
              <span>AC</span>
            </button>

            <button
              type="button"
              className={
                filters.transmission === "automatic" ? css.itemActive : css.item
              }
              onClick={() =>
                setFilters({
                  ...filters,
                  transmission: filters.transmission ? "" : "automatic",
                })
              }
            >
              <svg width={32} height={32}>
                <use href="/sprite.svg#diagram" />
              </svg>
              <span>Automatic</span>
            </button>
          </div>
        </div>

        <div className={css.section}>
          <h3 className={css.sectionHeader}>Vehicle type</h3>
          <hr className={css.divider} />
          <div className={css.categoriesGrid}>
            {["panelTruck", "fullyIntegrated", "alcove"].map((type) => (
              <button
                key={type}
                type="button"
                className={filters.form === type ? css.itemActive : css.item}
                onClick={() => handleTypeChange(type)}
              >
                <svg width={32} height={32}>
                  <use href={`/sprite.svg#${type}`} />
                </svg>
                <span>
                  {type === "panelTruck"
                    ? "Van"
                    : type === "fullyIntegrated"
                      ? "Full Integrated"
                      : "Alcove"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button
          className={css.searchBtn}
          onClick={onSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
}
