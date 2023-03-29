import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Modal } from "react-bootstrap";
import { googleApiKey } from "../../../../constants/config";
import axios from "../../../../constants/customAxios";

import MapMarker from "../../../MapMarker/MapMarker";
import SearchLocation from "../../../SearchLocation/SearchLocation";
import BtnBlue from "../../Buttons/BtnBlue/BtnBlue";

import Coord from "../../../utils/CoordInterface";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
	locationSearched,
	locationSelected,
	toggleModal,
} from "../../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import {
	selectAdFormState,
	selectIsLocationModalOpen,
} from "../../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";

import styles from "./LocationModal.module.scss";

const LocationModal = () => {
	const state = useAppSelector(selectAdFormState);
	const dispatch = useAppDispatch();

	const [center, setCenter] = useState<Coord | undefined>({
		lat: +state.location_lat,
		lng: +state.location_lng,
	});

	const [markerLocation, setMarkerLocation] = useState<Coord | undefined>({
		lat: +state.location_lat,
		lng: +state.location_lng,
	});

	const [hasLocationError, setHasLocationError] = useState(false);
	const isOpen = useAppSelector(selectIsLocationModalOpen);

	useEffect(() => {
		if (!state.location_is_marker) {
			const coord = {
				lat: +state.location_lat,
				lng: +state.location_lng,
			};
			setCenter(coord);
			setMarkerLocation(coord);
		} else {
			setMarkerLocation({
				lat: +state.location_lat,
				lng: +state.location_lng,
			});
		}
	}, [state.location_lat, state.location_lng, state.location_is_marker]);

	const setMarker = (event: any) => {
		const { lat, lng } = event;
		dispatch(locationSelected({ lat, lng, isMarker: true }));
	};

	const searchForLocation = (inputValue: string, callback: any) => {
		axios
			.post("v2/search", {
				search: inputValue,
				lat: state.location_lat,
				lng: state.location_lng,
			})
			.then((response) => {
				const data = response.data.data;

				data.forEach((element: any) => {
					element.value = element.entity_id;
					element.label = element.name;
				});

				callback(data);
			})
			.catch((err) => console.log(err));
	};

	const close = () => {
		dispatch(toggleModal(false));
	};

	const onSubmit = () => {
		if (!state.location_lng || !state.location_lat) {
			setHasLocationError(true);
			return;
		}

		if (!state.airport_id || !state.location_text) {
			if (
				window.confirm(
					"This ad is not linked to any airport in our system (you did not search for any). If you choose to proceed clients will still see the AD on their feeds and map, but it won't be showed on the about page of airports",
				)
			) {
				close();
				return;
			}
		}

		close();
	};

	return (
		<Modal show={isOpen} onHide={close} centered dialogClassName={styles.modal}>
			{/* <Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header> */}

			<Modal.Body className={styles.modal_body}>
				<div className={styles.map_container}>
					<GoogleMapReact
						bootstrapURLKeys={{
							key: googleApiKey,
						}}
						defaultZoom={12}
						center={center}
						onClick={(event: any) => setMarker(event)}
						shouldUnregisterMapOnUnmount={true}
					>
						<MapMarker
							lat={markerLocation ? markerLocation.lat : center?.lat}
							lng={markerLocation ? markerLocation.lng : center?.lng}
						/>
						{/* <MapMarker lat={center?.lat} lng={center?.lng} /> */}
					</GoogleMapReact>
				</div>

				<div className={styles.inputWrapper}>
					<div className={styles.inputContainer}>
						<SearchLocation
							searchForLocation={searchForLocation}
							onInputChange={(input) => dispatch(locationSearched(input))}
							onChange={(selected: any) => {
								dispatch(
									locationSelected({
										lat: selected.point_type.latitude,
										lng: selected.point_type.longitude,
										airport_id: selected.entity_id,
										name: selected.name,
									}),
								);
								setHasLocationError(false);
							}}
							customSelectStyles={{
								control: (provided: any) => ({
									...provided,
									boxShadow: hasLocationError ? "0 0 5px red" : "",
									border: hasLocationError ? "2px solid red" : "",
								}),
							}}
						/>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<BtnBlue onClick={() => onSubmit()}>Save</BtnBlue>
			</Modal.Footer>
		</Modal>
	);
};

export default LocationModal;
