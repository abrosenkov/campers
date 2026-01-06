"use client";

import Link from "next/link";
import css from "./Header.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalog");

  return (
    <header className={css.header}>
      <div className={`${css.navWrapper} container`}>
        <Link href="/" aria-label="Home">
          <svg className={css.logo}>
            <use href="/sprite.svg#logo" />
          </svg>
        </Link>
        <nav className={css.menu} aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link
                className={clsx(css.link, isHome && css.active)}
                href="/"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={clsx(css.link, isCatalog && css.active)}
                href="/catalog"
                aria-label="Catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
