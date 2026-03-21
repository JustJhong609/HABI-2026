import {
  CO2E_PER_KG_LPG,
  LOCATIONS,
  LPG_EQUIVALENT_KG_PER_M3,
  LPG_PRICE_PER_KG_PHP,
  WASTE_TYPES
} from "../data/mockData";
import { PredictionResult, WasteEntry } from "../types";

const round = (value: number) => Number(value.toFixed(2));

const estimateDigesterSize = (biogasM3PerDay: number): "4m3" | "6m3" | "8m3" => {
  if (biogasM3PerDay < 2.5) {
    return "4m3";
  }
  if (biogasM3PerDay < 4.5) {
    return "6m3";
  }
  return "8m3";
};

const buildFeedstockTips = (entries: WasteEntry[]): string[] => {
  const manureWeight = entries
    .filter((entry) => entry.wasteTypeId.includes("manure") || entry.wasteTypeId.includes("litter"))
    .reduce((sum, entry) => sum + entry.weightKg, 0);

  const cropResidueWeight = entries
    .filter((entry) => !entry.wasteTypeId.includes("manure") && !entry.wasteTypeId.includes("litter"))
    .reduce((sum, entry) => sum + entry.weightKg, 0);

  const manureShare = manureWeight / Math.max(manureWeight + cropResidueWeight, 1);

  if (manureShare < 0.35) {
    return [
      "Increase manure share to around 40% for faster digestion startup.",
      "Pre-soak fibrous residues (rice straw/coconut husk) overnight before feeding.",
      "Feed in smaller daily batches to keep gas production stable."
    ];
  }

  if (manureShare > 0.7) {
    return [
      "Blend more crop residues to reduce slurry density and improve mixing.",
      "Dilute thick manure feed with water at roughly 1:1 before loading.",
      "Avoid overloading in one day; split into morning and afternoon feed."
    ];
  }

  return [
    "Your manure-to-residue mix is near the ideal range for consistent methane yield.",
    "Shred coarse materials before feeding to improve breakdown speed.",
    "Maintain a steady daily feed schedule for better gas predictability."
  ];
};

const buildMaintenanceChecklist = (): string[] => {
  return [
    "Check digester temperature daily (target 30-38 C).",
    "Verify pH stays between 6.8 and 7.5.",
    "Inspect inlet and outlet for clogging every week.",
    "Look for gas leaks using soap-water bubble test.",
    "Stir or agitate slurry gently for uniform digestion."
  ];
};

export const runMockPrediction = (entries: WasteEntry[], locationId: string): PredictionResult => {
  const location = LOCATIONS.find((option) => option.id === locationId) ?? LOCATIONS[0];

  const baseBiogas = entries.reduce((sum, entry) => {
    const waste = WASTE_TYPES.find((item) => item.id === entry.wasteTypeId);
    if (!waste) {
      return sum;
    }
    return sum + entry.weightKg * waste.factorM3PerKg;
  }, 0);

  const biogasM3PerDay = round(baseBiogas * location.multiplier);
  const totalLpgKgPerMonth = biogasM3PerDay * 30 * LPG_EQUIVALENT_KG_PER_M3;
  const lpgSavingsMonthlyPhp = round(totalLpgKgPerMonth * LPG_PRICE_PER_KG_PHP);
  const lpgSavingsYearlyPhp = round(lpgSavingsMonthlyPhp * 12);
  const carbonAvoidedKgCO2eMonthly = round(totalLpgKgPerMonth * CO2E_PER_KG_LPG);
  const cookingHoursPerDay = round(biogasM3PerDay * 2);
  const totalWasteKg = round(entries.reduce((sum, entry) => sum + entry.weightKg, 0));

  return {
    biogasM3PerDay,
    lpgSavingsMonthlyPhp,
    lpgSavingsYearlyPhp,
    carbonAvoidedKgCO2eMonthly,
    cookingHoursPerDay,
    totalWasteKg,
    digesterSize: estimateDigesterSize(biogasM3PerDay),
    feedstockTips: buildFeedstockTips(entries),
    maintenanceChecklist: buildMaintenanceChecklist()
  };
};
