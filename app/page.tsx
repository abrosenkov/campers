// import Link from "next/link";
import { Metadata } from "next";
import css from "./page.module.css";
import { Button } from "@/components/UI/Button/Button";

export const metadata: Metadata = {
  title: "TravelTrucks | Campers of your dreams",
  description:
    "Rent the best campervans and motorhomes. You can find everything you want in our catalog for your perfect road trip.",
  keywords: ["campervan rental", "road trip", "motorhome hire", "TravelTrucks"],
  openGraph: {
    title: "TravelTrucks | Campers of your dreams",
    description: "Rent the best campervans for your next adventure.",
    type: "website",
    images: [
      {
        url: "/hero/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "TravelTrucks Campervan",
      },
    ],
  },
};

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
