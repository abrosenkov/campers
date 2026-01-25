"use client";

import { useState } from "react";
import css from "./Sidebar.module.css";
import { useCamperStore } from "@/stores/useCamperStore";
import { Button } from "@/components/UI/Button/Button";

import { BooleanFilterKeys, CampersQuery } from "@/types";
import { SIDEBAR_FEATURES, TYPE_CONFIG } from "@/lib/constants";
import clsx from "clsx";

type EquipmentState = Record<BooleanFilterKeys | "transmission", boolean>;
type VehicleForm = "panelTruck" | "fullyIntegrated" | "alcove" | "";

type SidebarProps = {
  onSubmitDone?: () => void;
  closeFilters?: () => void;
};

export default function Sidebar({ onSubmitDone, closeFilters }: SidebarProps) {
  const { fetchCampers, isLoading } = useCamperStore();

  const [location, setLocation] = useState("");
  const [formType, setFormType] = useState<VehicleForm>("");
  const [equipment, setEquipment] = useState<EquipmentState>({
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

    const apiFilters: CampersQuery = {};
    const normalizedLocation = location.trim();

    if (normalizedLocation) apiFilters.location = normalizedLocation;
    if (formType)
      apiFilters.form = formType as "panelTruck" | "fullyIntegrated" | "alcove";

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

    onSubmitDone?.();
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
                  equipment[item.id as keyof EquipmentState]
                    ? css.itemActive
                    : ""
                )}
              >
                <input
                  type="checkbox"
                  className={css.visuallyHidden}
                  checked={equipment[item.id as keyof EquipmentState]}
                  onChange={() =>
                    setEquipment((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id as keyof EquipmentState],
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
                  onClick={(e) => {
                    e.preventDefault();
                    setFormType((prev) =>
                      prev === type.id ? "" : (type.id as VehicleForm)
                    );
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
        onClick={closeFilters}
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
