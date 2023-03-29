import React from "react";

import AdPieChart from "../AdPieChart/AdPieChart";

import styles from "./AdChartContainer.module.scss";

const AdChartContainer = (props: {
	lightColor: string;
	darkColor: string;
	title: string;
	subTitle: string;
	number: number;
	centerText: string;
	img: any;
	chartKey?: number;
	rotate?: number;
	percentage?: boolean;
	secondNumber?: number;
}) => {
	let key = props.chartKey;
	if (!key) key = 1;

	const { darkColor, lightColor } = props;

	return (
		<div className={styles.white_box}>
			<div className={styles.label_area}>
				<img src={props.img} alt="" />

				<div
					className={styles.divisor}
					style={{
						borderRightColor: lightColor,
					}}
				>
					<div
						className={styles.point}
						style={{
							background: lightColor,
						}}
					></div>
					<div className={styles.bar}></div>
				</div>

				<div className={styles.text_wrapper}>
					<h1 style={{ color: lightColor }}>{props.title}</h1>
					<p>{props.subTitle}</p>
				</div>
			</div>

			<div className={styles.chart_wrapper}>
				<div className={styles.chart_central_text}>
					<h1 style={{ color: lightColor }}>
						{props.percentage
							? props.number.toString() + "%"
							: props.number}
					</h1>
					<p>{props.centerText}</p>
				</div>

				<AdPieChart
					darkColor={darkColor}
					lightColor={lightColor}
					value={props.number}
					chartKey={key}
					rotate={props.rotate}
					secondValue={props.secondNumber}
				/>
			</div>
		</div>
	);
};

export default AdChartContainer;
