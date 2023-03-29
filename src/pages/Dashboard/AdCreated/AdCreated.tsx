import React from "react";
import { Link } from "react-router-dom";

import img from "../../../assets/image/577.png";
import ROUTES from "../../../routes/route";

import styles from "./AdCreated.module.scss";

const AdCreated = () => {
	return (
		<div className={styles.ad_created_container}>
			<img src={img} alt="Plane on an airport" />
			<h2>Congratulations</h2>
			<p>
				You will appear on the map immediately. Your ads is currently
				being reviewed by Worsky team. This process can take up to 48
				hours. After approval, your account will be activated
				automatically and an email will be sent. And all Worsky users
				will see your ads on the map and in the feed.
			</p>

			<Link to={ROUTES.dashboard.home}>Manage your ads here</Link>
		</div>
	);
};

export default AdCreated;
