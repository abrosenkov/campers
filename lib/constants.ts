import { Camper } from "@/types";

export const CAMPER_FEATURES: { id: keyof Camper; icon: string; label?: string }[] = [
  { id: 'transmission', icon: 'automatic' },
  { id: 'engine', icon: 'fuel' },
  { id: 'kitchen', icon: 'kitchen', label: 'Kitchen' },
  { id: 'AC', icon: 'ac', label: 'AC' },
  { id: 'bathroom', icon: 'bathroom', label: 'Bathroom' },
  { id: 'TV', icon: 'tv', label: 'TV' },
  { id: 'radio', icon: 'radio', label: 'Radio' },
  { id: 'refrigerator', icon: 'fridge', label: 'Refrigerator' },
  { id: 'microwave', icon: 'microwave', label: 'Microwave' },
  { id: 'gas', icon: 'gas', label: 'Gas' },
  { id: 'water', icon: 'water', label: 'Water' }
];