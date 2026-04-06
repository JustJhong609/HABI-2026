import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(IonPage, { children: _jsx(IonContent, { fullscreen: true, className: "agri-bg", children: _jsxs("div", { className: "prototype-shell space-y-5", children: [_jsxs("div", { className: "mb-1 flex items-center justify-between rounded-2xl bg-field-700 px-4 py-3 text-white shadow-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-lime-100", children: "Prediction Result" }), _jsx("h1", { className: "font-display text-lg font-bold", children: "Your biogas outlook is ready" })] }), _jsx("p", { className: "rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-field-700", children: "Step 3 of 4" })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [_jsx(IonCard, { className: "metric-card ion-no-margin", children: _jsxs(IonCardContent, { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500", children: "Biogas Yield" }), _jsxs("p", { className: "mt-1 font-display text-2xl text-field-700", children: [prediction.biogasM3PerDay, " m3/day"] })] }) }), _jsx(IonCard, { className: "metric-card ion-no-margin", children: _jsxs(IonCardContent, { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500", children: "LPG Savings / Month" }), _jsx("p", { className: "mt-1 font-display text-2xl text-field-700", children: currency.format(prediction.lpgSavingsMonthlyPhp) })] }) }), _jsx(IonCard, { className: "metric-card ion-no-margin", children: _jsxs(IonCardContent, { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500", children: "LPG Savings / Year" }), _jsx("p", { className: "mt-1 font-display text-2xl text-field-700", children: currency.format(prediction.lpgSavingsYearlyPhp) })] }) }), _jsx(IonCard, { className: "metric-card ion-no-margin", children: _jsxs(IonCardContent, { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500", children: "Carbon Avoided" }), _jsxs("p", { className: "mt-1 font-display text-2xl text-field-700", children: [prediction.carbonAvoidedKgCO2eMonthly, " kg CO2e/mo"] })] }) })] }), _jsx(IonCard, { className: "glass-card ion-no-margin", children: _jsxs(IonCardContent, { className: "space-y-4 p-5", children: [_jsx("h2", { className: "section-title", children: "Daily Cooking Potential" }), _jsxs("p", { className: "text-sm text-slate-600", children: ["Estimated clean cooking availability from your current waste mix: ", _jsxs("strong", { children: [prediction.cookingHoursPerDay, " hours/day"] }), "."] }), _jsx("div", { className: "h-4 overflow-hidden rounded-full bg-lime-100", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-700", style: { width: `${gaugePercent}%` } }) }), _jsxs("div", { className: "rounded-xl bg-lime-50 p-4 text-sm text-slate-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Location effect:" }), " ", location?.climateNote] }), _jsxs("p", { className: "mt-1", children: [_jsx("strong", { children: "Total feedstock:" }), " ", prediction.totalWasteKg, " kg/day across your selected waste streams."] })] }), _jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [_jsx(IonButton, { expand: "block", size: "large", onClick: () => history.push("/guidance"), children: "View Digester Sizing & Tips" }), _jsx(IonButton, { expand: "block", fill: "outline", size: "large", onClick: () => history.push("/input"), children: "Adjust Waste Inputs" })] })] }) })] }) }) }));
};
export default DashboardPage;
