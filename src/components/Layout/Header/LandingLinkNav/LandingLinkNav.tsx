import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "routes/route";

import styles from "./LandingLinkNav.module.scss";

const LandingLinkNav = () => (
	<ul className={styles.right_header_nav}>
		<li>
			<Link to={ROUTES.about.whyWorsky}>Why Worsky</Link>
		</li>
		<li>
			<Link to={ROUTES.about.howItWorks}>How it works</Link>
		</li>
		<li>
			<Link to={ROUTES.about.adFormats}>Add Formats</Link>
		</li>
		<li>
			<Link to={ROUTES.about.pricing}>Pricing</Link>
		</li>
		<li>
			<Link to={ROUTES.auth.login}>LOGIN</Link>
		</li>
	</ul>
);

export default LandingLinkNav;
