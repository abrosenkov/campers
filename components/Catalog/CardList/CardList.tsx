"use client";

import { useCamperStore } from "@/stores/useCamperStore";
import css from "./CardList.module.css";
import CamperCard from "../CamperCard/CamperCard";

export default function CardList() {
  const { items, isLoading } = useCamperStore();

  if (!Array.isArray(items)) {
    return <p>Data error</p>;
  }

  if (isLoading && items.length === 0) {
    return <p>Loading campers...</p>;
  }

  if (!isLoading && items.length === 0) {
    return <p>No campers found</p>;
  }

  return (
    <ul className={css.list}>
      {items.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
}
