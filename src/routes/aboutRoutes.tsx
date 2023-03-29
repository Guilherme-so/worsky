import React from "react";
import ROUTES from "./route";
import WhyWorsksy from "../pages/Landing/WhyWorsky/WhyWorsky";
import HowItWorks from "../pages/Landing/HowItWorks/HowItWorks";
import Pricing from "../pages/Landing/Pricing/Pricing";
import AdFormats from "../pages/Landing/AdFormats/AdFormats";
import route from "./routeInterface";

const ABOUT_ROUTES: route[] = [
	{ path: ROUTES.about.whyWorsky, component: <WhyWorsksy /> },
	{ path: ROUTES.about.howItWorks, component: <HowItWorks /> },
	{ path: ROUTES.about.adFormats, component: <AdFormats /> },
	{ path: ROUTES.about.pricing, component: <Pricing /> },
];

export default ABOUT_ROUTES;
