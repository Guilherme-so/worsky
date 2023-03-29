import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { googleApiKey } from "../../../../constants/config";

import MapMarker from "../../../MapMarker/MapMarker";

import stepsState from "../../../../pages/Dashboard/Steps/reducer/StepsStateInterface";
import action from "../../utils/action";
import actions from "../../../../pages/Dashboard/Steps/reducer/StepActionsEnum";
import Coord from "../../../utils/CoordInterface";

import styles from "./MapComponent.module.scss";

const MapComponent = (props: {
	className?: string;
	state: stepsState;
	localDispatch: React.Dispatch<action>;
	isVirtualStatic?: boolean;
}) => {
	const { state, localDispatch } = props;
	const [center, setCenter] = useState<Coord | undefined>(undefined);
	const [markerLocation, setMarkerLocation] = useState<Coord | undefined>(undefined);

	useEffect(() => {
		let coord = { lat: 0, lng: 0 };

		if (state.location) {
			if (state.location.isMarker)
				coord = { lat: state.location.lat, lng: state.location.lng };
			else
				coord = {
					lat: state.location.lat,
					lng: state.location.lng,
				};
		} else if (state.position)
			coord = {
				lat: state.position.coords.latitude,
				lng: state.position.coords.longitude,
			};
		else
			coord = {
				lat: 59.95,
				lng: 30.33,
			};

		setCenter(coord);
		setMarkerLocation(coord);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (state.location && !state.location.isMarker) {
			const coord = {
				lat: +state.location.lat,
				lng: +state.location.lng,
			};
			setCenter(coord);
			setMarkerLocation(coord);
		} else if (state.location) {
			setMarkerLocation({
				lat: state.location.lat,
				lng: state.location.lng,
			});
		}
	}, [state.location]);

	const setMarker = async (event: any) => {
		const { lat, lng } = event;

		localDispatch({
			type: actions.LOCATION_SELECTED,
			payload: { lat, lng, isMarker: true },
		});
	};

	return (
		<div className={`${props.className} ${styles.right_container}`}>
			<div className={styles.map_container}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: googleApiKey,
					}}
					defaultZoom={12}
					center={center}
					onClick={(event: any) => props.isVirtualStatic ?? setMarker(event)}
					shouldUnregisterMapOnUnmount={true}
				>
					<MapMarker
						lat={
							markerLocation && markerLocation.lat ? markerLocation.lat : center?.lat
						}
						lng={
							markerLocation && markerLocation.lng ? markerLocation.lng : center?.lng
						}
					/>
				</GoogleMapReact>
			</div>
		</div>
	);
};

export default MapComponent;
