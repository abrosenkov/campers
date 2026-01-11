import { Camper } from "@/types";
import css from "./CamperCard.module.css";
import Image from "next/image";
import { Button } from "@/components/UI/Button/Button";
import { Badge } from "@/components/UI/Badge/Badge";
import { CAMPER_FEATURES } from "@/lib/constants";
import { useCamperStore } from "@/stores/useCamperStore";
import clsx from "clsx";
import toast from "react-hot-toast";

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  // Get favorite state and toggle function from global store
  const { favorites, toggleFavorite } = useCamperStore();
  const isFavorite = favorites.includes(camper.id);

  // Handle favorite button click with toast notifications
  const handleFavoriteClick = () => {
    toggleFavorite(camper.id);

    if (!isFavorite) {
      toast.success(
        <span>
          <b>{camper.name}</b> added to favorites
        </span>,
        {
          duration: 2500,
          style: {
            border: "1px solid #101828",
            padding: "16px",
            color: "#101828",
            borderRadius: "12px",
            fontSize: "16px",
          },
          iconTheme: {
            primary: "#E44848",
            secondary: "#fff",
          },
        }
      );
    } else {
      toast(
        <span>
          <b>{camper.name}</b> removed from favorites
        </span>,
        {
          icon: "🗑️",
          duration: 2500,
          style: {
            border: "1px solid #dadde1",
            padding: "16px",
            color: "#475467",
            borderRadius: "12px",
            fontSize: "16px",
          },
        }
      );
    }
  };

  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          width={292}
          height={320}
          style={{ height: "auto" }}
          className={css.image}
        />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <div className={css.priceBlock}>
            <p className={css.price}>€{camper.price.toFixed(2)}</p>
            <button
              className={clsx(css.heartBtn, isFavorite ? css.iconActive : "")}
              type="button"
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg width={24} height={24} className={css.icon}>
                <use href="/sprite.svg#heart" />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.meta}>
          <div className={css.rating}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/sprite.svg#star-full" />
            </svg>
            <span>
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

        <p className={css.description}>{camper.description}</p>

        <div className={css.badges}>
          {CAMPER_FEATURES.map(({ id, icon, label }) => {
            const value = camper[id];

            if (!value) return null;

            const displayText =
              label || (typeof value === "string" ? value : String(value));

            return <Badge key={id} iconId={icon} text={displayText} />;
          })}
        </div>

        <Button className={css.button} href={`/catalog/${camper.id}`}>
          Show more
        </Button>
      </div>
    </li>
  );
}
