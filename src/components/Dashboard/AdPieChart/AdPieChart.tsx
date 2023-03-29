import React from "react";
import { VictoryPie } from "victory";

import styles from "./AdPieChart.module.scss";

const INNER_RADIUS = 160;

const AdPieChart = (props: {
	lightColor: string;
	darkColor: string;
	value: number;
	secondValue?: number;
	chartKey?: number;
	rotate?: number;
}) => {
	let key = props.chartKey;
	if (!key) key = 1;

	let secondValue =
		props.value === 0 ? 100 : props.value - (props.value / 100) * 70;

	if (props.secondValue) {
		secondValue = props.secondValue;
	}

	return (
		<div className={styles.chart}>
			<svg viewBox="0 0 500 500">
				<defs>
					<linearGradient
						id={`gradient${key}`}
						x1="0%"
						y1="0%"
						x2="60%"
						y2="100%"
						gradientTransform="rotate(-40)"
					>
						<stop offset="0%" stopColor={props.darkColor} />
						<stop offset="80%" stopColor={props.lightColor} />
					</linearGradient>
				</defs>
				<VictoryPie
					standalone={false}
					width={500}
					height={500}
					data={[{ x: 1, y: 120 }]}
					innerRadius={INNER_RADIUS}
					style={{
						data: {
							borderRadius: "50px",
							fill: "#c4c4c4",
						},
						labels: {
							fill: "transparent",
						},
					}}
				/>
				<VictoryPie
					standalone={false}
					width={500}
					height={500}
					data={[
						{ key: 1, y: props.value },
						{
							key: 2,
							y: secondValue,
						},
					]}
					colorScale={[`url(#gradient${key})`, "transparent"]}
					innerRadius={INNER_RADIUS}
					labelRadius={100}
					style={{
						labels: { fontSize: 20, fill: "transparent" },
					}}
					cornerRadius={({ datum }) => (datum.key === 1 ? 100 : 0)}
					startAngle={props.rotate}
					animate={{
						onLoad: {
							duration: 2000,
						},
					}}
				/>
			</svg>
		</div>
	);
};

export default AdPieChart;
