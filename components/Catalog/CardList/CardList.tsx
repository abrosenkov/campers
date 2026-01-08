"use client";

import { useCamperStore } from "@/stores/useCamperStore";
import { useEffect } from "react";
import css from "./CardList.module.css";
import CamperCard from "../CamperCard/CamperCard";

export default function CardList() {
  const items = useCamperStore((state) => state.items);
  console.log(items);
  const isLoading = useCamperStore((state) => state.isLoading);
  const fetchCampers = useCamperStore((state) => state.fetchCampers);

  useEffect(() => {
    fetchCampers({}, true);
  }, [fetchCampers]);

  if (isLoading && items.length === 0) {
    return <p>Loading campers...</p>;
  }

  return (
    <ul className={css.list}>
      {items.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
}
