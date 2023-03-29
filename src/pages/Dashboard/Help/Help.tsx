import React from "react";

import DashboardContainer from "../../../components/Dashboard/DashboardContainer/DashboardContainer";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";

import styles from "./Help.module.scss";

const Help = () => {
	return (
		<DashboardContainer xPadding>
			<PageTitle style={{ marginBottom: "2rem" }}>FAQ - HELP</PageTitle>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					1. Can anyone advertise on Worsky?
				</p>
				<p className={styles.answer_p}>
					Yes, any person or company that wants to advertise its
					business or product. As long as you are over 18 years old.
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					2. Does the registration I have in the Worsky app serve to
					access the Worsky ADS?
				</p>
				<p className={styles.answer_p}>
					Yes, if you already have a registration on the Worsky app,
					there is no need to do another one.
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					3. Can I cancel a purchase on the ADS after payment?
				</p>
				<p className={styles.answer_p}>
					Yes, just send us an email with your username and the value
					to worsky@worsky.com
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					4. How do I contact you if you have any questions?
				</p>
				<p className={styles.answer_p}>
					You can contact us at worsky@worsky.com
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					5. How do I cancel (suspend) my ADS account?
				</p>
				<p className={styles.answer_p}>
					To cancel your Worsky account, send us an email at
					worsky@worsky.com
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					6. How is my ad viewed in the app and on the Worsky website?
				</p>
				<p className={styles.answer_p}>
					It appears in the region where it was chosen when the
					advertising was set up.
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					7. Do you have a telephone for assistance? What service
					channels are available?
				</p>
				<p className={styles.answer_p}>
					No. The only service channel is the contact form on the
					website worsky.com and via email worsky@worsky.com
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					8. After creating my advertisement and paying, how long does
					it take for the Worsky team to release?
				</p>
				<p className={styles.answer_p}>
					The time for the release of your advertisement after our
					team's analysis is up to 48 hours, but usually within a few
					hours the advertisement is already released.
				</p>
			</div>

			<div className={styles.p_wrapper}>
				<p className={styles.summary_p}>
					9. I didn't find my question here. How to proceed?
				</p>
				<p className={styles.answer_p}>
					Send us an email to worsky@worsky.com
				</p>
			</div>
		</DashboardContainer>
	);
};

export default Help;
