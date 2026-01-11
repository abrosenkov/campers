import { CamperReview } from "@/types";
import css from "./ReviewsList .module.css";

interface ReviewsListProps {
  reviews: CamperReview[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return <div>ReviewsList</div>;
}
