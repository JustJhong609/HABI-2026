import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import OnboardingPage from "./pages/OnboardingPage";
import WasteInputPage from "./pages/WasteInputPage";
import DashboardPage from "./pages/DashboardPage";
import GuidancePage from "./pages/GuidancePage";
const App = () => {
    return (_jsx(IonApp, { children: _jsx(IonReactRouter, { children: _jsx(AppProvider, { children: _jsxs(IonRouterOutlet, { children: [_jsx(Route, { exact: true, path: "/", component: OnboardingPage }), _jsx(Route, { exact: true, path: "/input", component: WasteInputPage }), _jsx(Route, { exact: true, path: "/dashboard", component: DashboardPage }), _jsx(Route, { exact: true, path: "/guidance", component: GuidancePage }), _jsx(Redirect, { to: "/" })] }) }) }) }));
};
export default App;
