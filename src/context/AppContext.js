import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from "react";
const defaultProfile = {
    locationId: "",
    activities: []
};
const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [profile, setProfile] = useState(defaultProfile);
    const [wasteEntries, setWasteEntries] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const value = useMemo(() => ({
        profile,
        setProfile,
        wasteEntries,
        setWasteEntries,
        prediction,
        setPrediction
    }), [prediction, profile, wasteEntries]);
    return _jsx(AppContext.Provider, { value: value, children: children });
};
export const useAppState = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppState must be used within AppProvider");
    }
    return context;
};
