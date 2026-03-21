import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  useIonToast
} from "@ionic/react";
import { cameraOutline, createOutline, trashOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { LOCATIONS, WASTE_TYPES } from "../data/mockData";
import { runMockPrediction } from "../utils/predict";
import { WasteEntry } from "../types";

const randomFrom = <T,>(values: T[]): T => values[Math.floor(Math.random() * values.length)];

const WasteInputPage = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { profile, wasteEntries, setWasteEntries, setPrediction } = useAppState();

  const [wasteTypeId, setWasteTypeId] = useState(WASTE_TYPES[0].id);
  const [weightInput, setWeightInput] = useState("50");
  const [predicting, setPredicting] = useState(false);
  const [processingPhoto, setProcessingPhoto] = useState(false);

  if (!profile.locationId) {
    history.replace("/");
    return null;
  }

  const addEntry = (source: "manual" | "photo", typeIdOverride?: string, weightOverride?: number) => {
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

    const entry: WasteEntry = {
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

  const removeEntry = (id: string) => {
    setWasteEntries(wasteEntries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id: string, updates: Partial<WasteEntry>) => {
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

  return (
    <div className="prototype-shell">
      <div className="mb-6 flex items-center justify-between rounded-2xl bg-earth-500 px-4 py-3 text-white shadow-lg">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-100">Farm Profile Active</p>
          <h1 className="font-display text-lg font-bold">{locationLabel}</h1>
        </div>
        <p className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-earth-700">Step 2 of 4</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr,1fr]">
        <IonCard className="glass-card ion-no-margin">
          <IonCardContent className="space-y-4 p-5">
            <h2 className="section-title">Add Agricultural Waste</h2>
            <p className="text-sm text-slate-600">Enter waste type and weight, or upload a photo to simulate AI recognition.</p>

            <IonItem className="rounded-xl border border-lime-200">
              <IonLabel position="stacked" className="font-semibold">
                Waste type
              </IonLabel>
              <IonSelect value={wasteTypeId} onIonChange={(event) => setWasteTypeId(event.detail.value)}>
                {WASTE_TYPES.map((type) => (
                  <IonSelectOption value={type.id} key={type.id}>
                    {type.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem className="rounded-xl border border-lime-200">
              <IonLabel position="stacked" className="font-semibold">
                Weight (kg)
              </IonLabel>
              <IonInput
                inputMode="decimal"
                type="number"
                min="0"
                value={weightInput}
                placeholder="e.g., 45"
                onIonInput={(event) => setWeightInput(event.detail.value ?? "")}
              />
            </IonItem>

            <div className="grid gap-3 sm:grid-cols-2">
              <IonButton expand="block" size="large" color="primary" onClick={() => addEntry("manual")}>
                Add Entry
              </IonButton>
              <IonButton
                expand="block"
                size="large"
                color="secondary"
                fill="outline"
                onClick={triggerPhotoPicker}
                disabled={processingPhoto}
              >
                <IonIcon icon={cameraOutline} slot="start" />
                {processingPhoto ? "Identifying..." : "Upload Photo"}
              </IonButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhotoSelected}
              />
            </div>

            {processingPhoto && (
              <div className="rounded-xl bg-lime-100 px-4 py-3 text-sm font-medium text-field-700">
                Image uploaded - identifying waste...
              </div>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard className="glass-card ion-no-margin">
          <IonCardContent className="space-y-4 p-5">
            <h2 className="section-title">Waste Entries</h2>
            {wasteEntries.length === 0 ? (
              <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">No entries yet. Add at least one input.</p>
            ) : (
              <IonList className="space-y-3 bg-transparent">
                {wasteEntries.map((entry) => (
                  <div className="rounded-xl border border-lime-200 bg-white p-3" key={entry.id}>
                    <div className="grid gap-2 sm:grid-cols-[1fr,120px,auto] sm:items-end">
                      <IonItem className="rounded-lg border border-slate-200">
                        <IonLabel position="stacked">Type</IonLabel>
                        <IonSelect
                          value={entry.wasteTypeId}
                          onIonChange={(event) => updateEntry(entry.id, { wasteTypeId: event.detail.value })}
                        >
                          {WASTE_TYPES.map((type) => (
                            <IonSelectOption key={type.id} value={type.id}>
                              {type.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>

                      <IonItem className="rounded-lg border border-slate-200">
                        <IonLabel position="stacked">Kg</IonLabel>
                        <IonInput
                          type="number"
                          min="0"
                          value={entry.weightKg}
                          onIonInput={(event) => {
                            const nextWeight = Number(event.detail.value);
                            if (nextWeight > 0) {
                              updateEntry(entry.id, { weightKg: nextWeight });
                            }
                          }}
                        />
                      </IonItem>

                      <div className="flex gap-2">
                        <IonButton fill="clear" color="medium" title="Edit entry">
                          <IonIcon icon={createOutline} />
                        </IonButton>
                        <IonButton fill="clear" color="danger" title="Remove entry" onClick={() => removeEntry(entry.id)}>
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </div>
                    </div>

                    <IonText className="mt-2 block text-xs text-slate-500">
                      Source: {entry.source === "photo" ? "Photo AI simulation" : "Manual entry"}
                    </IonText>
                  </div>
                ))}
              </IonList>
            )}

            <IonButton expand="block" size="large" onClick={predict} disabled={predicting || wasteEntries.length === 0}>
              {predicting ? (
                <span className="flex items-center gap-2">
                  <IonSpinner name="dots" /> Running AI prediction...
                </span>
              ) : (
                "Predict Biogas Potential"
              )}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default WasteInputPage;
