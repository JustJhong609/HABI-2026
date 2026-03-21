import { IonApp, IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import OnboardingPage from "./pages/OnboardingPage";
import WasteInputPage from "./pages/WasteInputPage";
import DashboardPage from "./pages/DashboardPage";
import GuidancePage from "./pages/GuidancePage";

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppProvider>
          <IonPage>
            <IonContent fullscreen className="agri-bg">
              <IonRouterOutlet>
                <Route exact path="/" component={OnboardingPage} />
                <Route exact path="/input" component={WasteInputPage} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/guidance" component={GuidancePage} />
                <Redirect to="/" />
              </IonRouterOutlet>
            </IonContent>
          </IonPage>
        </AppProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
