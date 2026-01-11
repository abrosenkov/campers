"use client";

import Image from "next/image";
import css from "./CamperDetails.module.css";

import { Camper } from "@/types";
import CamperTabs from "./CamperTabs/CamperTabs";

type CamperDetailsProps = {
  camper: Camper;
};

export default function CamperDetails({ camper }: CamperDetailsProps) {
  return (
    <div className={css.mainSection}>
      <div className={css.infoWrap}>
        <h1 className={css.title}>{camper.name}</h1>
        <div className={css.meta}>
          <div className={css.rating}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprite.svg#star-full" />
            </svg>
            <span className={css.ratinText}>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={css.location}>
            <svg width={20} height={20} className={css.icon}>
              <use href="/sprite.svg#map" />
            </svg>
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={css.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <ul className={css.gallery}>
        {camper.gallery.map((item, i) => (
          <li key={i} className={css.itemImg}>
            <Image
              src={item.thumb}
              alt={camper.name}
              width={292}
              height={312}
              className={css.image}
            />
          </li>
        ))}
      </ul>

      <p className={css.description}>{camper.description}</p>
      <CamperTabs camper={camper} />
    </div>
  );
}
