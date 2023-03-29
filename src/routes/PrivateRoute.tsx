import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {selectToken,selectUser,} from "../redux/slices/authSlice/authSelectors";
import ROUTES from "./route";

const PrivateRoute = (props: any) => {
  const accessToken = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const { children, ...rest } = props;
  const location = useLocation();

  if (accessToken) {
    if (user?.need_add_data && !location.pathname.includes("user-add-data"))
      return (
        <Route
          {...rest}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: ROUTES.dashboard.firebaseAddData,
                state: { from: location },
              }}
            />
          )}
        />
      );

    return <Route {...rest} render={() => children} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: ROUTES.auth.login,
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default PrivateRoute;
