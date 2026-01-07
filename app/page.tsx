// import Link from "next/link";
import css from "./page.module.css";
import { Button } from "@/components/UI/Button/Button";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.hero}>
        <div className="container">
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.description}>
            You can find everything you want in our catalog
          </p>
          <Button href="/catalog">View Now</Button>
        </div>
      </div>
    </main>
  );
}
