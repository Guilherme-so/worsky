import React from "react";

import Landing from "../Landing";

import styles from "./Pricing.module.scss";

const Pricing = () => (
	<Landing className={styles.pricing}>
		<h1 className="text-start"> PRICING</h1>

		<div className={styles.mini_container}>
			<p>15.00 USD</p>
			<p>Your advertisement will run for 10 days</p>
		</div>

		<div className={styles.mini_container}>
			<p>25.00 USD</p>
			<p>Your advertisement will run for 20 days</p>
		</div>

		<div className={styles.mini_container}>
			<p>35.00 USD</p>
			<p>Your advertisement will run for 30 days</p>
		</div>

		<p>The subscription can be renewed after the expiration of the term.</p>
	</Landing>
);

export default Pricing;
