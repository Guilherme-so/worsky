import React from "react";

import Landing from "../Landing";

import styles from "./WhyWorsky.module.scss";

const WhyWorsksy = () => (
	<Landing className={styles.why_worsky}>
		<h1> WHY ADVERTISE ON WORSKY?</h1>
		<div className={styles.first_p}>
			<p>
				Worsky, is the only aviation app in the world that brings
				together all aviation professionals, stakeholders and
				enthusiasts
			</p>
			<p>
				Worsky is in every country in the world, 24 hours a day, this
				means that your ad is being
			</p>
			<p>
				seen all the time, which will bring greater visibility and
				return on sales to your company or business.
			</p>
			<p>
				It will strengthen your brand and be known to potential
				customers.
			</p>
		</div>
		<p className={styles.second_p}>
			What are the advantages of advertising on Worsky?
		</p>

		<ul className="list-unstyled text-start">
			<li>1. Your company will be known in the world.</li>
			<li>2. Your advertisement will run 24 hours a day.</li>
			<li>
				3. Because it is a targeted app, it will reach your audience for
				sure.
			</li>
			<li>4. Low cost and high benefit.</li>
			<li>
				5. You can create your advertisement by display, banner or
				video.
			</li>
			<li>6. You will have full control of access and views</li>
			<li>7. Convert a few dollars into many customers.</li>
		</ul>

		<p className={styles.third_p}>
			For sure, you will be doing the best business in the aviation world!
		</p>
	</Landing>
);

export default WhyWorsksy;
