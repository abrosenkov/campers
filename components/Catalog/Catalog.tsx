"use client";

import { useEffect, useRef, useState } from "react";
import { useCamperStore } from "@/stores/useCamperStore";
import CardList from "./CardList/CardList";
import { Button } from "../UI/Button/Button";
import css from "./Catalog.module.css";
import Loader from "../Loader/Loader";

export default function Catalog() {
  const { items, total, isLoading, fetchCampers, loadMore } = useCamperStore();
  const prevCountRef = useRef(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    fetchCampers({}).finally(() => {
      setIsFirstLoad(false);
    });
  }, [fetchCampers]);

  useEffect(() => {
    if (items.length > prevCountRef.current && prevCountRef.current > 0) {
      window.scrollBy({ top: 600, behavior: "smooth" });
    }
    prevCountRef.current = items.length;
  }, [items.length]);

  return (
    <div className={css.catalogWrapper}>
      {(isLoading && items.length === 0) ||
      (isFirstLoad && items.length === 0) ? (
        <Loader />
      ) : (
        <>
          {items.length > 0 ? (
            <CardList />
          ) : (
            !isLoading && (
              <p className={css.empty}>
                No campers found matching your criteria.
              </p>
            )
          )}
        </>
      )}

      {items.length > 0 && items.length < total && (
        <div className={css.pagination}>
          <Button
            variant="outline"
            onClick={() => loadMore()}
            disabled={isLoading}
            className={css.loadMoreBtn}
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
