import { Camper } from "@/types";

export const CAMPER_FEATURES: { id: keyof Camper; icon: string; label?: string }[] = [
  { id: 'transmission', icon: 'automatic' },
  { id: 'engine', icon: 'fuel' },
  { id: 'kitchen', icon: 'kitchen', label: 'Kitchen' },
  { id: 'AC', icon: 'ac', label: 'AC' },
  { id: 'bathroom', icon: 'bathroom', label: 'Bathroom' },
  { id: 'TV', icon: 'tv', label: 'TV' },
  { id: 'radio', icon: 'radio', label: 'Radio' },
  { id: 'refrigerator', icon: 'refrigerator', label: 'Refrigerator' },
  { id: 'microwave', icon: 'microwave', label: 'Microwave' },
  { id: 'gas', icon: 'gas', label: 'Gas' },
  { id: 'water', icon: 'water', label: 'Water' }
];

export const SIDEBAR_FEATURES: { id: keyof Camper; icon: string; label?: string }[] = [
  { id: 'AC', icon: 'ac', label: 'AC' },
  { id: 'transmission', icon: 'automatic', label: 'Automatic' },
  { id: 'kitchen', icon: 'kitchen', label: 'Kitchen' },
  { id: 'TV', icon: 'tv', label: 'TV' },
  { id: 'radio', icon: 'radio', label: 'Radio' },
  { id: 'refrigerator', icon: 'refrigerator', label: 'Refrigerator' },
  { id: 'bathroom', icon: 'bathroom', label: 'Bathroom' },
  { id: 'microwave', icon: 'microwave', label: 'Microwave' },
  { id: 'gas', icon: 'gas', label: 'Gas' },
  { id: 'water', icon: 'water', label: 'Water' }
];

export const TYPE_CONFIG = [
  { id: "panelTruck", label: "Van", icon: "van" },
  { id: "fullyIntegrated", label: "Fully Integrated", icon: "fully-integrated" },
  { id: "alcove", label: "Alcove", icon: "alcove" },
];