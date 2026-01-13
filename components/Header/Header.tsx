"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import css from "./Header.module.css";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
];

export default function Header() {
  const pathname = usePathname();

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
            {NAV_LINKS.map(({ name, href }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={clsx(css.link, isActive && css.active)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
