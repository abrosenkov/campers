"use client";

import { useEffect } from "react";
import CardList from "./CardList/CardList";
import { useCamperStore } from "@/stores/useCamperStore";

export default function Catalog() {
  const { items, total, fetchCampers, isLoading } = useCamperStore();

  const handleLoadMore = () => {
    fetchCampers();
  };

  const hasMore = items.length < total;

  useEffect(() => {
    if (items.length === 0) {
      fetchCampers({}, true);
    }
  }, [fetchCampers, items.length]);
  return (
    <div>
      <CardList />
    </div>
  );
}
