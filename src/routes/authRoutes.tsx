import React from "react";
import ROUTES from "./route";

// import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PasswordReset from "../pages/Auth/PasswordReset/PasswordReset";
import route from "./routeInterface";

const AUTH_ROUTES: route[] = [
	// { path: ROUTES.auth.login, component: <Login /> },
	{ path: ROUTES.auth.register, component: <Register /> },
	{ path: ROUTES.auth.passwordReset, component: <PasswordReset /> },
];

export default AUTH_ROUTES;
