import { IonButton, IonCard, IonCardContent, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { LOCATIONS } from "../data/mockData";

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0
});

const DashboardPage = () => {
  const history = useHistory();
  const { prediction, profile } = useAppState();

  if (!prediction) {
    history.replace("/input");
    return null;
  }

  const location = LOCATIONS.find((item) => item.id === profile.locationId);
  const maxCookingHours = 12;
  const gaugePercent = Math.min(100, (prediction.cookingHoursPerDay / maxCookingHours) * 100);

  return (
    <IonPage>
      <IonContent fullscreen className="agri-bg">
        <div className="prototype-shell space-y-5">
          <div className="mb-1 flex items-center justify-between rounded-2xl bg-field-700 px-4 py-3 text-white shadow-lg">
            <div>
              <p className="text-xs uppercase tracking-wide text-lime-100">Prediction Result</p>
              <h1 className="font-display text-lg font-bold">Your biogas outlook is ready</h1>
            </div>
            <p className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-field-700">Step 3 of 4</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <IonCard className="metric-card ion-no-margin">
              <IonCardContent>
                <p className="text-xs uppercase tracking-wide text-slate-500">Biogas Yield</p>
                <p className="mt-1 font-display text-2xl text-field-700">{prediction.biogasM3PerDay} m3/day</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="metric-card ion-no-margin">
              <IonCardContent>
                <p className="text-xs uppercase tracking-wide text-slate-500">LPG Savings / Month</p>
                <p className="mt-1 font-display text-2xl text-field-700">{currency.format(prediction.lpgSavingsMonthlyPhp)}</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="metric-card ion-no-margin">
              <IonCardContent>
                <p className="text-xs uppercase tracking-wide text-slate-500">LPG Savings / Year</p>
                <p className="mt-1 font-display text-2xl text-field-700">{currency.format(prediction.lpgSavingsYearlyPhp)}</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="metric-card ion-no-margin">
              <IonCardContent>
                <p className="text-xs uppercase tracking-wide text-slate-500">Carbon Avoided</p>
                <p className="mt-1 font-display text-2xl text-field-700">{prediction.carbonAvoidedKgCO2eMonthly} kg CO2e/mo</p>
              </IonCardContent>
            </IonCard>
          </div>

          <IonCard className="glass-card ion-no-margin">
            <IonCardContent className="space-y-4 p-5">
              <h2 className="section-title">Daily Cooking Potential</h2>
              <p className="text-sm text-slate-600">
                Estimated clean cooking availability from your current waste mix: <strong>{prediction.cookingHoursPerDay} hours/day</strong>.
              </p>

              <div className="h-4 overflow-hidden rounded-full bg-lime-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-700"
                  style={{ width: `${gaugePercent}%` }}
                />
              </div>

              <div className="rounded-xl bg-lime-50 p-4 text-sm text-slate-700">
                <p>
                  <strong>Location effect:</strong> {location?.climateNote}
                </p>
                <p className="mt-1">
                  <strong>Total feedstock:</strong> {prediction.totalWasteKg} kg/day across your selected waste streams.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <IonButton expand="block" size="large" onClick={() => history.push("/guidance")}>
                  View Digester Sizing & Tips
                </IonButton>
                <IonButton expand="block" fill="outline" size="large" onClick={() => history.push("/input")}>
                  Adjust Waste Inputs
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
