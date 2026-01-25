"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import css from "./Header.module.css";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className={css.header}>
        <div className={`${css.navWrapper} container`}>
          <Link href="/" aria-label="Home">
            <svg className={css.logo}>
              <use href="/sprite.svg#logo" />
            </svg>
          </Link>

          {isOpen ? (
            <button
              className={css.closeMenuButton}
              aria-label="Close Mobile Menu"
              onClick={() => setIsOpen(false)}
            >
              <svg className={css.iconCloseMenu}>
                <use href="/sprite.svg#close-menu" />
              </svg>
            </button>
          ) : (
            <button
              className={css.mobileMenuButton}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <svg className={css.iconMobileMenu}>
                <use href="/sprite.svg#burger" />
              </svg>
            </button>
          )}

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

      <div
        className={clsx(
          css.mobileNavigationWapper,
          isOpen ? css.activeMenu : null
        )}
      >
        <nav className={css.mobileMenu} aria-label="Mobile Navigation">
          <ul className={css.mobileNavigation}>
            {NAV_LINKS.map(({ name, href }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
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
    </>
  );
}
