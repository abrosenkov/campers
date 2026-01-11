import { getCamperById } from "@/lib/campers";
import css from "./page.module.css";
import { notFound } from "next/navigation";
import axios from "axios";
import CamperDetails from "@/components/CamperDetails/CamperDetails";

interface CamperDetailsPageProps {
  params: Promise<{ id: string }>;
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
    console.log(camper);

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
