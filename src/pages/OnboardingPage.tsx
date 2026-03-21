import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  useIonToast
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ACTIVITIES, LOCATIONS } from "../data/mockData";
import { useAppState } from "../context/AppContext";

const OnboardingPage = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const { profile, setProfile, setPrediction } = useAppState();

  const toggleActivity = (id: string, checked: boolean) => {
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

  return (
    <IonPage>
      <IonContent fullscreen className="agri-bg">
        <div className="prototype-shell">
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-field-700 px-4 py-3 text-white shadow-lg">
            <div>
              <p className="text-xs uppercase tracking-wide text-lime-100">AgriGasAI</p>
              <h1 className="font-display text-lg font-bold">Biogas Potential Predictor</h1>
            </div>
            <p className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-field-700">Step 1 of 4</p>
          </div>

          <IonCard className="glass-card ion-no-margin">
            <IonCardContent className="space-y-6 p-5 md:p-7">
              <div>
                <h2 className="hero-title">Set up your farm profile</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Tell us where your farm is located and your main activities. This helps tune the mock AI estimate.
                </p>
              </div>

              <div>
                <p className="section-title mb-2">Farm Location</p>
                <IonItem className="rounded-xl border border-lime-200">
                  <IonLabel position="stacked" className="font-semibold text-slate-700">
                    Select location
                  </IonLabel>
                  <IonSelect
                    interface="popover"
                    value={profile.locationId}
                    placeholder="Choose a province"
                    onIonChange={(event) =>
                      setProfile({
                        ...profile,
                        locationId: event.detail.value
                      })
                    }
                  >
                    {LOCATIONS.map((location) => (
                      <IonSelectOption key={location.id} value={location.id}>
                        {location.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>

              <div>
                <p className="section-title mb-2">Primary Agricultural Activities</p>
                <IonList className="rounded-xl border border-lime-200 bg-lime-50/60">
                  {ACTIVITIES.map((activity) => {
                    const checked = profile.activities.includes(activity.id);
                    return (
                      <IonItem key={activity.id} lines="full" className="--background:transparent">
                        <IonCheckbox
                          checked={checked}
                          onIonChange={(event) => toggleActivity(activity.id, event.detail.checked)}
                          labelPlacement="end"
                        >
                          <IonText className="font-medium text-slate-700">{activity.label}</IonText>
                        </IonCheckbox>
                      </IonItem>
                    );
                  })}
                </IonList>
              </div>

              <IonButton expand="block" size="large" onClick={submit}>
                Continue to Waste Input
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingPage;
