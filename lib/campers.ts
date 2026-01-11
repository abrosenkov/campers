import { Camper, CampersQuery, CampersResponse } from "@/types";
import api from "./api";


export const getCampers = async (
  params: CampersQuery = {}
): Promise<CampersResponse> => {
  const { data } = await api.get<CampersResponse>("/campers", {
    params,
  });

  return data;
};

export const getCamperById = async (id: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
};