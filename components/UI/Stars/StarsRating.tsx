"use client";

import clsx from "clsx";
import css from "./StarsRating.module.css";

type Props = {
  value: number;
  max?: number;
  className?: string;
};

export default function StarsRating({ value, max = 5, className }: Props) {
  const rounded = Math.round(value);

  return (
    <div
      className={clsx(css.stars, className)}
      aria-label={`Rating ${rounded} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isActive = index < rounded;

        return (
          <span
            key={index}
            className={clsx(css.star, isActive && css.starActive)}
          >
            <svg width="16" height="16">
              <use href="/sprite.svg#rating-star" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
