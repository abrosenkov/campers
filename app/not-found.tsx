import React from "react";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "Page not found. Return to TravelTrucks and keep your notes organized.",
  openGraph: {
    title: "Page not found",
    description:
      "Page not found. Return to TravelTrucks and keep your notes organized.",
    url: "https://traveltrucks.example.com/not-found",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks image",
      },
    ],
  },
};

export default function notFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
