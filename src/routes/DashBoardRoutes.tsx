import AdCreated from "../pages/Dashboard/AdCreated/AdCreated";
import CreateAd from "../pages/Dashboard/CreateAd/CreateAd";
import EditAdFormPage from "../pages/Dashboard/EditAd/EditAdFormPage/EditAdFormPage";
import EditAdTablePage from "../pages/Dashboard/EditAd/EditAdTablePage/EditAdTablePage";
import Help from "../pages/Dashboard/Help/Help";

import Dashboard from "../pages/Dashboard/Home/Dashboard";
import Invoices from "../pages/Dashboard/Payments/Invoices/Invoices";
import PaymentMethods from "../pages/Dashboard/Payments/PaymentMethods/PaymentMethods";
import Profile from "../pages/Dashboard/UserData/Profile/Profile";
import Steps from "../pages/Dashboard/Steps/Steps";
import TermsAndConditions from "../pages/Dashboard/TermsAndConditions/TermsAndConditions";
import ROUTES from "./route";
import route from "./routeInterface";
import FirebaseAdditionalData from "pages/Dashboard/UserData/FirebaseAdditionalData/FirebaseAdditionalData";

const DASHBOARD_ROUTES: route[] = [
	{ path: ROUTES.dashboard.steps, component: <Steps />, auth: true },
	{ path: ROUTES.dashboard.adCreated, component: <AdCreated />, auth: true },
	{
		path: ROUTES.dashboard.ads,
		component: <EditAdTablePage />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.editAd,
		component: <EditAdFormPage />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.createAd,
		component: <CreateAd />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.paymentMethods,
		component: <PaymentMethods />,
		auth: true,
	},
	{ path: ROUTES.dashboard.invoices, component: <Invoices />, auth: true },
	{
		path: ROUTES.dashboard.help,
		component: <Help />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.terms,
		component: <TermsAndConditions />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.editProfile,
		component: <Profile />,
		auth: true,
	},
	{
		path: ROUTES.dashboard.firebaseAddData,
		component: <FirebaseAdditionalData />,
		auth: true,
	},
	{ path: ROUTES.dashboard.home, component: <Dashboard />, auth: true },
];

export default DASHBOARD_ROUTES;
