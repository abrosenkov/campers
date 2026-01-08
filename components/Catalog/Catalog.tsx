"use client";

import css from "./Catalog.module.css";
import { useEffect, useRef } from "react";
import CardList from "./CardList/CardList";
import { useCamperStore } from "@/stores/useCamperStore";
import { Button } from "../UI/Button/Button";

export default function Catalog() {
  // Sync with global store for camper data and pagination state
  const { items, total, fetchCampers, isLoading } = useCamperStore();

  // Track previous item count to trigger scroll only on "Load More"
  const prevCountRef = useRef(items.length);

  const handleLoadMore = () => {
    fetchCampers();
  };

  // Smooth scroll after new items are added to the DOM
  useEffect(() => {
    if (items.length > prevCountRef.current && prevCountRef.current > 0) {
      window.scrollBy({
        top: 820,
        behavior: "smooth",
      });
    }
    prevCountRef.current = items.length;
  }, [items.length]);

  // Determine if there are more pages based on API total count
  const hasMore = items.length < total;

  // Initial data fetch on component mount if store is empty
  useEffect(() => {
    if (items.length === 0) {
      fetchCampers({}, true);
    }
  }, [fetchCampers, items.length]);
  return (
    <div className={css.catalogWrapper}>
      <CardList />
      <div className={css.pagination}>
        {hasMore && (
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
            className={css.loadMoreBtn}
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
    </div>
  );
}
