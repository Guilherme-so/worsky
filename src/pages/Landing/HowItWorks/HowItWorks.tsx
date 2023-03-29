import React from "react";

import Landing from "../Landing";

import styles from "./HowItWorks.module.scss";

const HowItWorks = () => (
	<Landing className={styles.how_it_works}>
		<h1> HOW IT WORKS</h1>

		<p>Advertising on Worsky is very simple and fast!</p>
		<p>There are only 6 steps, in a totally safe environment</p>

		<h2>STEP 1</h2>
		<p>
			You put your name (your business name), and add me soon. It will start to be displayed
			in the layout on the right side.
		</p>

		<h2>STEP 2</h2>
		<p>
			You fill in the description of your business and put the link where you want to point.
		</p>

		<h2>STEP 3</h2>
		<p>You choose the type of advertisement. There are 3 types:</p>
		<p>
			-Display (will display your name, logo and description, and if you click\nit will go to
			your address link)
		</p>
		<p>
			-Banner (you upload an image in jpg or png format in size 640 x 360 px, and if you click
			it will go to the link of your address)
		</p>
		<p>
			-Video (you can put a video of your business advertisement, in 16: 9 format, in the size
			of 640 x 360 px,\nand if you click it will go to the link of your address)
		</p>

		<h2>STEP 4</h2>
		<p>
			You write the location of your business, for example it can be an airport,eg KJfK, or
			the name\nJohn F. Kennedy, you can also drag it to the desired point on the map on the
			side.
		</p>

		<h2>STEP 5</h2>
		<p>
			You choose the time and monthly budget: 10 days (15 USD), 20 days (25 USD), 30 days (35
			USD)
		</p>

		<h2>STEP 6</h2>
		<p>
			You enter your credit card details and make the payment. After the expired period,
			your\nsubscription can be renewed.
		</p>
		<p>
			After this period, your advertisement is analyzed and released by the Worsky\nteam in a
			few minutes.
		</p>
		<p>As you can see, advertising on Worsky is simple and quick!</p>
	</Landing>
);

export default HowItWorks;
