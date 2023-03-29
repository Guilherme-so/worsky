import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "bootstrap/dist/css/bootstrap.min.css";

import ProfileMenu from "./components/Layout/ProfileMenu/ProfileMenu";
import PresentationHome from "./pages/Landing/PresentationHome/PresentationHome";
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Layout/Menu/Menu";
import Login from "./pages/Auth/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";

import ABOUT_ROUTES from "./routes/aboutRoutes";
import AUTH_ROUTES from "./routes/authRoutes";
import ROUTES from "./routes/route";
import DASHBOARD_ROUTES from "./routes/DashBoardRoutes";
import RouteInterface from "./routes/routeInterface";
import { stripeKey, paypalKey } from "./constants/config";
import { logout } from "./redux/slices/authSlice/authSlice";
import {
  selectExpiresIn,
  selectToken,
  selectUser,
} from "./redux/slices/authSlice/authSelectors";
import {
  fetchCountries,
  fetchUserCategories,
  getUserData,
} from "./redux/slices/authSlice/authAsyncActions";
import {
  fetchAdCategories,
  getDashboardStats,
  getPlans,
  retrievePayments,
  fetchIsAirportAdmin,
} from "./redux/slices/dashboardSlice/dashboardAsyncActions";

import "./App.css";

const stripePromise = loadStripe(stripeKey, { locale: "en" });

const tokenExpired = (expiresIn: string | null) =>
  expiresIn && new Date(expiresIn).getTime() < new Date().getTime();

const SCRIPT_PROVIDER_OPTIONS = {
  "client-id": paypalKey,
  currency: "USD",
};

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const expiresIn = useAppSelector(selectExpiresIn);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchAdCategories());
    dispatch(fetchUserCategories());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      if (tokenExpired(expiresIn)) {
        dispatch(logout({}));
        return;
      }

      dispatch(retrievePayments());
      dispatch(getDashboardStats());
      dispatch(getPlans());
      dispatch(fetchIsAirportAdmin());
      return;
    }

    if (accessToken) {
      if (tokenExpired(expiresIn)) {
        dispatch(logout({}));
        return;
      }

      dispatch(getUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, dispatch, user]);

  const generateRoutes = () => {
    let routes: RouteInterface[] = [];
    routes = routes.concat(ABOUT_ROUTES, AUTH_ROUTES, DASHBOARD_ROUTES);

    return routes;
  };

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <PayPalScriptProvider
          options={SCRIPT_PROVIDER_OPTIONS}
          deferLoading={true}
        >
          <Header />
          <Menu />
          <ProfileMenu />
          <Switch>
            <Route
              path={ROUTES.auth.login}
              render={() =>
                accessToken ? (
                  <Redirect to={ROUTES.dashboard.steps} />
                ) : (
                  <Login />
                )
              }
            />

            {generateRoutes().map((route) =>
              route.auth ? (
                <PrivateRoute path={route.path} key={route.path}>
                  {route.component}
                </PrivateRoute>
              ) : (
                <Route path={route.path} key={route.path}>
                  {route.component}
                </Route>
              )
            )}

            <Route path={ROUTES.home}>
              <PresentationHome />
            </Route>
          </Switch>
        </PayPalScriptProvider>
      </Elements>
    </div>
  );
}

export default App;
