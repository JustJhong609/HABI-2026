import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { PredictionResult, Profile, WasteEntry } from "../types";

type AppContextValue = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  wasteEntries: WasteEntry[];
  setWasteEntries: (entries: WasteEntry[]) => void;
  prediction: PredictionResult | null;
  setPrediction: (result: PredictionResult | null) => void;
};

const defaultProfile: Profile = {
  locationId: "",
  activities: []
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      wasteEntries,
      setWasteEntries,
      prediction,
      setPrediction
    }),
    [prediction, profile, wasteEntries]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
};
