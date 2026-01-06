import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.hero}>
        <div className="container">
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.description}>
            You can find everything you want in our catalog
          </p>
          <Link className={css.ctaButton} href="/catalog">
            View Now
          </Link>
        </div>
      </div>
    </main>
  );
}
