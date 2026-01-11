import { getCamperById } from "@/lib/campers";
import css from "./page.module.css";
import { notFound } from "next/navigation";
import axios from "axios";
import CamperDetails from "@/components/CamperDetails/CamperDetails";
import { Metadata } from "next";

interface CamperDetailsPageProps {
  params: Promise<{ id: string }>;
}

const BASE_URL = "https://campers-el18.vercel.app";

export async function generateMetadata({
  params,
}: CamperDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const camper = await getCamperById(id);

    if (!camper) {
      return {
        title: "Camper Not Found | TravelTrucks",
      };
    }

    const title = `${camper.name} | TravelTrucks`;
    const description = camper.description
      ? camper.description.slice(0, 160)
      : "Book this amazing campervan for your next trip.";

    return {
      title,
      description,
      alternates: {
        canonical: `${BASE_URL}/catalog/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `${BASE_URL}/catalog/${id}`,
        images: [
          {
            url:
              camper.gallery?.[0]?.original || camper.gallery?.[0]?.thumb || "",
            width: 1200,
            height: 630,
            alt: camper.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Camper Details | TravelTrucks",
    };
  }
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { id } = await params;

  try {
    const camper = await getCamperById(id);

    if (!camper) {
      notFound();
    }

    return (
      <div className="container">
        <main className={css.main}>
          <CamperDetails camper={camper} />
        </main>
      </div>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        notFound();
      }
    }
  }
}
