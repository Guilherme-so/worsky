import React from "react";

import Landing from "../Landing";

import styles from "./AdFormats.module.scss";

const AdFormats = () => (
	<Landing className={styles.ad_formats}>
		<h1> AD FORMATS?</h1>

		<p>
			When advertising on Worsky you have 3 types of advertisements, just
			choose the one you like best for your business:
		</p>

		<h2>DISPLAY</h2>
		<p>Text format, logo and description.\nStandard size (640 x 360 px)</p>

		<h2>BANNER</h2>
		<p>
			You upload a jpg or png image of your advertisement.The size should
			be: 640 x 360 px
		</p>

		<h2>VIDEO</h2>
		<p>
			You upload a video of your advertisement, in AVI, MP4, MPG or MOV
			format.\nThe size should be: 640 x 360 px
		</p>
		<p>And once served, you can pause, or edit if you need to.</p>
		<p>There are 3 different ways to appear to the world!</p>
	</Landing>
);

export default AdFormats;
