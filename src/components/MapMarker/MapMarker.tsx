import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapMarker = (props: {
	lat: number | undefined;
	lng: number | undefined;
}) => (
	<FaMapMarkerAlt
		color="red"
		fontSize="1.6rem"
		style={{
			position: "absolute",
			transform: "translate(-50%, -50%)",
		}}
	/>
);

export default MapMarker;
