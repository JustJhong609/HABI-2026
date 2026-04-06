import { ActivityOption, LocationOption, WasteTypeOption } from "../types";

export const LOCATIONS: LocationOption[] = [
  {
    id: "laguna",
    label: "Laguna",
    multiplier: 1.05,
    climateNote: "Warmer average temperatures support steady digester activity."
  },
  {
    id: "nueva-ecija",
    label: "Nueva Ecija",
    multiplier: 1.1,
    climateNote: "Dry-season heat can slightly increase conversion efficiency."
  },
  {
    id: "benguet",
    label: "Benguet",
    multiplier: 0.9,
    climateNote: "Cooler upland conditions can reduce gas production rates."
  },
  {
    id: "iloilo",
    label: "Iloilo",
    multiplier: 1.08,
    climateNote: "Humid lowland climate favors stable microbial digestion."
  },
  {
    id: "bukidnon",
    label: "Bukidnon",
    multiplier: 1.03,
    climateNote: "Mild highland climate supports stable digestion when feed is consistent."
  },
  {
    id: "davao-del-sur",
    label: "Davao del Sur",
    multiplier: 1.06,
    climateNote: "Warm and humid conditions can improve methane production rates."
  },
  {
    id: "south-cotabato",
    label: "South Cotabato",
    multiplier: 1.02,
    climateNote: "Balanced temperatures are favorable for regular biogas output."
  },
  {
    id: "misamis-oriental",
    label: "Misamis Oriental",
    multiplier: 1.05,
    climateNote: "Coastal humidity helps maintain digester moisture balance."
  },
  {
    id: "agusan-del-sur",
    label: "Agusan del Sur",
    multiplier: 1.04,
    climateNote: "Warm lowland weather can support active microbial digestion."
  },
  {
    id: "zamboanga-del-sur",
    label: "Zamboanga del Sur",
    multiplier: 1.01,
    climateNote: "Tropical temperatures support steady gas generation with proper feeding."
  }
];

export const ACTIVITIES: ActivityOption[] = [
  { id: "rice", label: "Rice farming" },
  { id: "coconut", label: "Coconut farming" },
  { id: "livestock", label: "Livestock raising" }
];

export const WASTE_TYPES: WasteTypeOption[] = [
  { id: "rice-straw", label: "Rice straw", factorM3PerKg: 0.025 },
  { id: "coconut-husk", label: "Coconut husk", factorM3PerKg: 0.02 },
  { id: "cow-manure", label: "Cow manure", factorM3PerKg: 0.04 },
  { id: "pig-manure", label: "Pig manure", factorM3PerKg: 0.045 },
  { id: "corn-stover", label: "Corn stover", factorM3PerKg: 0.028 },
  { id: "chicken-litter", label: "Chicken litter", factorM3PerKg: 0.035 },
  { id: "pineapple-waste", label: "Pineapple waste", factorM3PerKg: 0.03 }
];

export const LPG_EQUIVALENT_KG_PER_M3 = 0.5;
export const LPG_PRICE_PER_KG_PHP = 70;
export const CO2E_PER_KG_LPG = 3;
