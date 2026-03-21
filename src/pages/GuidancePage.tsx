import { IonButton, IonCard, IonCardContent, IonChip } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { LOCATIONS, WASTE_TYPES } from "../data/mockData";

const GuidancePage = () => {
  const history = useHistory();
  const { prediction, profile, wasteEntries } = useAppState();

  if (!prediction) {
    history.replace("/input");
    return null;
  }

  const location = LOCATIONS.find((option) => option.id === profile.locationId);
  const usedWasteLabels = wasteEntries
    .map((entry) => WASTE_TYPES.find((type) => type.id === entry.wasteTypeId)?.label)
    .filter(Boolean);

  return (
    <div className="prototype-shell space-y-5">
      <div className="mb-1 flex items-center justify-between rounded-2xl bg-earth-700 px-4 py-3 text-white shadow-lg">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-100">Action Plan</p>
          <h1 className="font-display text-lg font-bold">Digester Sizing & Operating Tips</h1>
        </div>
        <p className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-earth-700">Step 4 of 4</p>
      </div>

      <IonCard className="glass-card ion-no-margin">
        <IonCardContent className="space-y-4 p-5">
          <h2 className="section-title">Recommended Digester Size</h2>
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-600 p-5 text-white">
            <p className="text-sm uppercase tracking-wide text-lime-100">Best Match for Your Inputs</p>
            <p className="mt-1 font-display text-4xl font-bold">{prediction.digesterSize}</p>
            <p className="mt-2 text-sm">
              Based on around {prediction.biogasM3PerDay} m3/day potential from {location?.label} feedstock conditions.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Waste streams considered</p>
            <div className="flex flex-wrap gap-2">
              {usedWasteLabels.map((label, index) => (
                <IonChip key={`${label}-${index}`}>{label}</IonChip>
              ))}
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <IonCard className="glass-card ion-no-margin">
          <IonCardContent className="space-y-3 p-5">
            <h2 className="section-title">Feedstock Mixing Tips</h2>
            {prediction.feedstockTips.map((tip, index) => (
              <div key={tip} className="rounded-xl border border-lime-200 bg-lime-50 p-3 text-sm text-slate-700">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-field-700 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                {tip}
              </div>
            ))}
          </IonCardContent>
        </IonCard>

        <IonCard className="glass-card ion-no-margin">
          <IonCardContent className="space-y-3 p-5">
            <h2 className="section-title">Maintenance Checklist</h2>
            {prediction.maintenanceChecklist.map((item, index) => (
              <label key={item} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-amber-700" />
                <span>
                  <strong>Task {index + 1}:</strong> {item}
                </span>
              </label>
            ))}
          </IonCardContent>
        </IonCard>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <IonButton expand="block" size="large" onClick={() => history.push("/input")}>Run Another Scenario</IonButton>
        <IonButton expand="block" size="large" fill="outline" onClick={() => history.push("/")}>Update Farm Profile</IonButton>
      </div>
    </div>
  );
};

export default GuidancePage;
