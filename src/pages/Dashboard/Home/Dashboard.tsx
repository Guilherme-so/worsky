import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

import DashboardContainer from "../../../components/Dashboard/DashboardContainer/DashboardContainer";
import AdChartContainer from "../../../components/Dashboard/AdChartContainer/AdChartContainer";

import view from "../../../assets/image/overview-1.png";
import clicks from "../../../assets/image/overview-2.png";
import growth from "../../../assets/image/overview-3.png";

import { selectDashboardStats } from "../../../redux/slices/dashboardSlice/dashboardSelectors";

import styles from "./Dashboard.module.scss";

const COLORS = {
	darkOrange: "#bd3b00",
	lightOrange: "#ff7536",
	darkBlue: "#0753e0",
	lightBlue: "#2672ff",
	darkPurple: "#6805eb",
	lightPurple: "#802ded",
};

const Dashboard = () => {
	const [adsClicked, setAdsClicked] = useState(0);
	const [adsViewed, setAdsViewed] = useState(0);
	const [growthFactor, setGrowthFactor] = useState(0);
	const stats = useAppSelector(selectDashboardStats);

	useEffect(() => {
		if (stats) {
			setAdsClicked(stats.adsClicked);
			setAdsViewed(stats.adsViewed);
			setGrowthFactor(stats.growthFactor);
		}
	}, [stats]);

	return (
		<DashboardContainer>
			{stats ? (
				<div className={styles.wrapper}>
					<AdChartContainer
						img={view}
						title="VIEWS"
						subTitle="From the first day of your publications"
						number={adsViewed}
						darkColor={COLORS.darkOrange}
						lightColor={COLORS.lightOrange}
						centerText="People saw your advertisements until today"
						chartKey={1}
						rotate={-100}
					/>

					<AdChartContainer
						img={clicks}
						title="CLICKS"
						subTitle="From the first day of your publications"
						number={adsClicked}
						darkColor={COLORS.darkBlue}
						lightColor={COLORS.lightBlue}
						centerText="People clicked on your advertisements until today"
						chartKey={2}
						rotate={-45}
					/>

					<AdChartContainer
						img={growth}
						title="GROWTH"
						subTitle="From the first day of your publications"
						number={growthFactor}
						darkColor={COLORS.darkPurple}
						lightColor={COLORS.lightPurple}
						centerText="It is the growth of your advertisements between views and clicks"
						chartKey={3}
						secondNumber={100 - growthFactor}
						percentage
					/>
				</div>
			) : (
				<div></div>
			)}
		</DashboardContainer>
	);
};

export default Dashboard;
