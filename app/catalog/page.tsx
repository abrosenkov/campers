import Catalog from "@/components/Catalog/Catalog";
import css from "./page.module.css";

export default function CatalogPage() {
  return (
    <div className="container">
      <div className={css.catalogLayout}>
        <aside className={css.sidebar}>Filters</aside>
        <main className={css.content}>
          <Catalog />
        </main>
      </div>
    </div>
  );
}
