import css from "./Badge.module.css";

interface BadgeProps {
  iconId: string;
  text: string;
}

export const Badge = ({ iconId, text }: BadgeProps) => {
  return (
    <div className={css.badge}>
      <svg width={20} height={20} className={css.icon}>
        <use href={`/sprite.svg#${iconId}`} />
      </svg>
      <span className={css.text}>{text}</span>
    </div>
  );
};
