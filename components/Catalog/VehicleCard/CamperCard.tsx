import { Camper } from "@/types";
import css from "./CamperCard.module.css";
import Image from "next/image";
import { Button } from "@/components/UI/Button/Button";

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          fill
          sizes="290px"
          className={css.image}
        />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <div className={css.priceBlock}>
            <p className={css.price}>€{camper.price.toFixed(2)}</p>
            <button className={css.heartBtn} type="button">
              {/* <Icon id="heart" width={24} height={24} /> */}
            </button>
          </div>
        </div>

        <div className={css.meta}>
          <div className={css.rating}>
            {/* <Icon id="star" className={css.starIcon} width={16} height={16} /> */}
            <span>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={css.location}>
            {/* <Icon id="map" width={16} height={16} /> */}
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.badges}>
          <div className={css.badge}>
            <svg width={20} height={20} className={css.icon}>
              <use href="sprite.svg#automatic" />
            </svg>
            <span>{camper.transmission}</span>
          </div>
          <div className={css.badge}>
            {/* <Icon id="fuel" width={20} height={20} /> */}
            <span>{camper.engine}</span>
          </div>
          {camper.AC && (
            <div className={css.badge}>
              {/* <Icon id="ac" width={20} height={20} /> */}
              <span>AC</span>
            </div>
          )}
          {camper.kitchen && (
            <div className={css.badge}>
              {/* <Icon id="kitchen" width={20} height={20} /> */}
              <span>Kitchen</span>
            </div>
          )}
        </div>

        <Button className={css.button} href={`/catalog/${camper.id}`}>
          Show more
        </Button>
      </div>
    </li>
  );
}
