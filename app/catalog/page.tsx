import Catalog from "@/components/Catalog/Catalog";
import css from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description:
    "Explore our wide range of campervans. Filter by equipment, type, and location to find the perfect vehicle for your next travel adventure.",
  keywords: [
    "campervan catalog",
    "rent campervan",
    "campervan filters",
    "van life",
    "TravelTrucks models",
  ],
  openGraph: {
    title: "Campervan Catalog | TravelTrucks",
    description: "Find your dream campervan in our extensive catalog.",
    type: "website",
    url: "hhttps://campers-el18.vercel.app/catalog",
  },
};

export default function CatalogPage() {
  return (
    <div className="container">
      <div className={css.catalogLayout}>
        <aside className={css.sidebar}>
          <Sidebar />
        </aside>
        <main className={css.content}>
          <Catalog />
        </main>
      </div>
    </div>
  );
}
