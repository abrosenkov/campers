import type { Metadata } from "next";
import "normalize.css";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description:
    "TravelTrucks — camper rental service that helps you find and book the perfect camper for your next journey. Explore, compare, and travel freely.",
  openGraph: {
    title: "TravelTrucks",
    description:
      "TravelTrucks — camper rental service for comfortable and unforgettable trips. Browse available campers, check features, and book with ease.",
    url: "https://traveltrucks.example.com",
    siteName: "TravelTrucks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks camper rental",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
