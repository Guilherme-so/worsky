import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../../../routes/route";

import styles from "./PresentationHome.module.scss";

const PresentationHome = () => {
	return (
		<div className={styles.home}>
			<div className={styles.home_content}>
				<p>
					Be seen at all airports and airspaces in the world.
					Advertise on the largest aviation network.
				</p>
				<Link to={ROUTES.auth.login} className={styles.btn_advertise}>
					Advertise on worsky
				</Link>
			</div>
		</div>
	);
};

export default PresentationHome;
