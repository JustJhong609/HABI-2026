import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonButton, IonCard, IonCardContent, IonCheckbox, IonContent, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ACTIVITIES, LOCATIONS } from "../data/mockData";
import { useAppState } from "../context/AppContext";
const OnboardingPage = () => {
    const history = useHistory();
    const [present] = useIonToast();
    const { profile, setProfile, setPrediction } = useAppState();
    const toggleActivity = (id, checked) => {
        const nextActivities = checked
            ? [...profile.activities, id]
            : profile.activities.filter((activityId) => activityId !== id);
        setProfile({
            ...profile,
            activities: nextActivities
        });
    };
    const submit = () => {
        if (!profile.locationId || profile.activities.length === 0) {
            present({
                message: "Please select your location and at least one activity.",
                duration: 1800,
                color: "warning"
            });
            return;
        }
        setPrediction(null);
        history.push("/input");
    };
    return (_jsx(IonPage, { children: _jsx(IonContent, { fullscreen: true, className: "agri-bg", children: _jsxs("div", { className: "prototype-shell", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between rounded-2xl bg-field-700 px-4 py-3 text-white shadow-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-lime-100", children: "AgriGasAI" }), _jsx("h1", { className: "font-display text-lg font-bold", children: "Biogas Potential Predictor" })] }), _jsx("p", { className: "rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-field-700", children: "Step 1 of 4" })] }), _jsx(IonCard, { className: "glass-card ion-no-margin", children: _jsxs(IonCardContent, { className: "space-y-6 p-5 md:p-7", children: [_jsxs("div", { children: [_jsx("h2", { className: "hero-title", children: "Set up your farm profile" }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Tell us where your farm is located and your main activities. This helps tune the mock AI estimate." })] }), _jsxs("div", { children: [_jsx("p", { className: "section-title mb-2", children: "Farm Location" }), _jsxs(IonItem, { className: "rounded-xl border border-lime-200", children: [_jsx(IonLabel, { position: "stacked", className: "font-semibold text-slate-700", children: "Select location" }), _jsx(IonSelect, { interface: "popover", value: profile.locationId, placeholder: "Choose a province", onIonChange: (event) => setProfile({
                                                        ...profile,
                                                        locationId: event.detail.value
                                                    }), children: LOCATIONS.map((location) => (_jsx(IonSelectOption, { value: location.id, children: location.label }, location.id))) })] })] }), _jsxs("div", { children: [_jsx("p", { className: "section-title mb-2", children: "Primary Agricultural Activities" }), _jsx(IonList, { className: "rounded-xl border border-lime-200 bg-lime-50/60", children: ACTIVITIES.map((activity) => {
                                                const checked = profile.activities.includes(activity.id);
                                                return (_jsx(IonItem, { lines: "full", className: "--background:transparent", children: _jsx(IonCheckbox, { checked: checked, onIonChange: (event) => toggleActivity(activity.id, event.detail.checked), labelPlacement: "end", children: _jsx(IonText, { className: "font-medium text-slate-700", children: activity.label }) }) }, activity.id));
                                            }) })] }), _jsx(IonButton, { expand: "block", size: "large", onClick: submit, children: "Continue to Waste Input" })] }) })] }) }) }));
};
export default OnboardingPage;
