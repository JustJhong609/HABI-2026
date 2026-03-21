export type LocationOption = {
  id: string;
  label: string;
  multiplier: number;
  climateNote: string;
};

export type ActivityOption = {
  id: string;
  label: string;
};

export type WasteTypeOption = {
  id: string;
  label: string;
  factorM3PerKg: number;
};

export type Profile = {
  locationId: string;
  activities: string[];
};

export type WasteEntry = {
  id: string;
  wasteTypeId: string;
  weightKg: number;
  source: "manual" | "photo";
};

export type PredictionResult = {
  biogasM3PerDay: number;
  lpgSavingsMonthlyPhp: number;
  lpgSavingsYearlyPhp: number;
  carbonAvoidedKgCO2eMonthly: number;
  cookingHoursPerDay: number;
  totalWasteKg: number;
  digesterSize: "4m3" | "6m3" | "8m3";
  feedstockTips: string[];
  maintenanceChecklist: string[];
};
