import { CamperReview } from "@/types";
import css from "./ReviewsList.module.css";
import StarsRating from "@/components/UI/Stars/StarsRating";

interface ReviewsListProps {
  reviews: CamperReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className={css.reviewsList}>
      {reviews.map((value, idx) => (
        <li key={`${value.reviewer_name}-${idx}`} className={css.reviewItem}>
          <div className={css.reviewHeader}>
            <div className={css.reviewerIcon}>
              {value.reviewer_name.charAt(0)}
            </div>
            <div className={css.ratingWrapper}>
              <p className={css.reviewer}>{value.reviewer_name}</p>
              <StarsRating value={value.reviewer_rating} />
            </div>
          </div>
          <p className={css.reviewText}>{value.comment}</p>
        </li>
      ))}
    </ul>
  );
}
