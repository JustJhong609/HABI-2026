import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonSpinner, IonText, useIonToast } from "@ionic/react";
import { cameraOutline, createOutline, trashOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { LOCATIONS, WASTE_TYPES } from "../data/mockData";
import { runMockPrediction } from "../utils/predict";
const randomFrom = (values) => values[Math.floor(Math.random() * values.length)];
const WasteInputPage = () => {
    const history = useHistory();
    const [present] = useIonToast();
    const fileInputRef = useRef(null);
    const { profile, wasteEntries, setWasteEntries, setPrediction } = useAppState();
    const [wasteTypeId, setWasteTypeId] = useState(WASTE_TYPES[0].id);
    const [weightInput, setWeightInput] = useState("50");
    const [predicting, setPredicting] = useState(false);
    const [processingPhoto, setProcessingPhoto] = useState(false);
    if (!profile.locationId) {
        history.replace("/");
        return null;
    }
    const addEntry = (source, typeIdOverride, weightOverride) => {
        const parsedWeight = weightOverride ?? Number(weightInput);
        const nextWasteTypeId = typeIdOverride ?? wasteTypeId;
        if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
            present({
                message: "Weight must be a positive number.",
                duration: 1800,
                color: "danger"
            });
            return;
        }
        const entry = {
            id: crypto.randomUUID(),
            wasteTypeId: nextWasteTypeId,
            weightKg: parsedWeight,
            source
        };
        setWasteEntries([...wasteEntries, entry]);
        if (source === "manual") {
            setWeightInput("");
        }
    };
    const removeEntry = (id) => {
        setWasteEntries(wasteEntries.filter((entry) => entry.id !== id));
    };
    const updateEntry = (id, updates) => {
        setWasteEntries(wasteEntries.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)));
    };
    const triggerPhotoPicker = () => {
        fileInputRef.current?.click();
    };
    const onPhotoSelected = () => {
        setProcessingPhoto(true);
        setTimeout(() => {
            const predictedType = randomFrom(WASTE_TYPES);
            const predictedWeight = Number((20 + Math.random() * 80).toFixed(1));
            addEntry("photo", predictedType.id, predictedWeight);
            setProcessingPhoto(false);
            present({
                message: `Image uploaded. Identified ${predictedType.label} at about ${predictedWeight} kg.`,
                duration: 2200,
                color: "success"
            });
        }, 1400);
    };
    const predict = () => {
        if (wasteEntries.length === 0) {
            present({
                message: "Add at least one waste entry before predicting.",
                duration: 1800,
                color: "warning"
            });
            return;
        }
        setPredicting(true);
        setTimeout(() => {
            const result = runMockPrediction(wasteEntries, profile.locationId);
            setPrediction(result);
            setPredicting(false);
            history.push("/dashboard");
        }, 1600);
    };
    const locationLabel = LOCATIONS.find((location) => location.id === profile.locationId)?.label ?? "Unknown";
    return (_jsx(IonPage, { children: _jsx(IonContent, { fullscreen: true, className: "agri-bg", children: _jsxs("div", { className: "prototype-shell", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between rounded-2xl bg-earth-500 px-4 py-3 text-white shadow-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-orange-100", children: "Farm Profile Active" }), _jsx("h1", { className: "font-display text-lg font-bold", children: locationLabel })] }), _jsx("p", { className: "rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-earth-700", children: "Step 2 of 4" })] }), _jsxs("div", { className: "grid gap-5 lg:grid-cols-[1.1fr,1fr]", children: [_jsx(IonCard, { className: "glass-card ion-no-margin", children: _jsxs(IonCardContent, { className: "space-y-4 p-5", children: [_jsx("h2", { className: "section-title", children: "Add Agricultural Waste" }), _jsx("p", { className: "text-sm text-slate-600", children: "Enter waste type and weight, or upload a photo to simulate AI recognition." }), _jsxs(IonItem, { className: "rounded-xl border border-lime-200", children: [_jsx(IonLabel, { position: "stacked", className: "font-semibold", children: "Waste type" }), _jsx(IonSelect, { value: wasteTypeId, onIonChange: (event) => setWasteTypeId(event.detail.value), children: WASTE_TYPES.map((type) => (_jsx(IonSelectOption, { value: type.id, children: type.label }, type.id))) })] }), _jsxs(IonItem, { className: "rounded-xl border border-lime-200", children: [_jsx(IonLabel, { position: "stacked", className: "font-semibold", children: "Weight (kg)" }), _jsx(IonInput, { inputMode: "decimal", type: "number", min: "0", value: weightInput, placeholder: "e.g., 45", onIonInput: (event) => setWeightInput(event.detail.value ?? "") })] }), _jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [_jsx(IonButton, { expand: "block", size: "large", color: "primary", onClick: () => addEntry("manual"), children: "Add Entry" }), _jsxs(IonButton, { expand: "block", size: "large", color: "secondary", fill: "outline", onClick: triggerPhotoPicker, disabled: processingPhoto, children: [_jsx(IonIcon, { icon: cameraOutline, slot: "start" }), processingPhoto ? "Identifying..." : "Upload Photo"] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: onPhotoSelected })] }), processingPhoto && (_jsx("div", { className: "rounded-xl bg-lime-100 px-4 py-3 text-sm font-medium text-field-700", children: "Image uploaded - identifying waste..." }))] }) }), _jsx(IonCard, { className: "glass-card ion-no-margin", children: _jsxs(IonCardContent, { className: "space-y-4 p-5", children: [_jsx("h2", { className: "section-title", children: "Waste Entries" }), wasteEntries.length === 0 ? (_jsx("p", { className: "rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600", children: "No entries yet. Add at least one input." })) : (_jsx(IonList, { className: "space-y-3 bg-transparent", children: wasteEntries.map((entry) => (_jsxs("div", { className: "rounded-xl border border-lime-200 bg-white p-3", children: [_jsxs("div", { className: "grid gap-2 sm:grid-cols-[1fr,120px,auto] sm:items-end", children: [_jsxs(IonItem, { className: "rounded-lg border border-slate-200", children: [_jsx(IonLabel, { position: "stacked", children: "Type" }), _jsx(IonSelect, { value: entry.wasteTypeId, onIonChange: (event) => updateEntry(entry.id, { wasteTypeId: event.detail.value }), children: WASTE_TYPES.map((type) => (_jsx(IonSelectOption, { value: type.id, children: type.label }, type.id))) })] }), _jsxs(IonItem, { className: "rounded-lg border border-slate-200", children: [_jsx(IonLabel, { position: "stacked", children: "Kg" }), _jsx(IonInput, { type: "number", min: "0", value: entry.weightKg, onIonInput: (event) => {
                                                                            const nextWeight = Number(event.detail.value);
                                                                            if (nextWeight > 0) {
                                                                                updateEntry(entry.id, { weightKg: nextWeight });
                                                                            }
                                                                        } })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(IonButton, { fill: "clear", color: "medium", title: "Edit entry", children: _jsx(IonIcon, { icon: createOutline }) }), _jsx(IonButton, { fill: "clear", color: "danger", title: "Remove entry", onClick: () => removeEntry(entry.id), children: _jsx(IonIcon, { icon: trashOutline }) })] })] }), _jsxs(IonText, { className: "mt-2 block text-xs text-slate-500", children: ["Source: ", entry.source === "photo" ? "Photo AI simulation" : "Manual entry"] })] }, entry.id))) })), _jsx(IonButton, { expand: "block", size: "large", onClick: predict, disabled: predicting || wasteEntries.length === 0, children: predicting ? (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(IonSpinner, { name: "dots" }), " Running AI prediction..."] })) : ("Predict Biogas Potential") })] }) })] })] }) }) }));
};
export default WasteInputPage;
