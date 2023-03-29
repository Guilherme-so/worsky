import stepsState from "./StepsStateInterface";
import actions from "./StepActionsEnum";
import action from "../../../../components/Dashboard/utils/action";

const reducer = (state: stepsState, action: action) => {
	let newNumber = 0;

	switch (action.type) {
		case actions.UPLOAD_FILE:
			return {
				...state,
				logoFile: action.payload.file,
				logoName: action.payload.fileName,
			};

		case actions.UPLOAD_DISPLAY_FILE:
			return {
				...state,
				displayFile: action.payload.file,
				displayFileName: action.payload.fileName,
			};

		case actions.NAME:
			return {
				...state,
				name: action.payload,
			};

		case actions.LOCATION_SEARCHED:
			return {
				...state,
				search: action.payload,
			};

		case actions.LOCATION_FETCHED:
			return {
				...state,
				locations: action.payload,
			};

		case actions.LOCATION_SELECTED:
			if (action.payload.isMarker) {
				return {
					...state,
					location: { ...state.location, ...action.payload },
				};
			} else {
				const airport = action.payload;

				return {
					...state,
					location: {
						lat: airport.point_type.latitude,
						lng: airport.point_type.longitude,
						name: airport.name,
						airport_id: airport.entity_id,
					},
				};
			}

		case actions.GET_POSITION:
			return {
				...state,
				position: action.payload,
			};

		case actions.ADDITIONAL_INFO:
			return {
				...state,
				additionalInformation: action.payload,
			};

		case actions.ADDITIONAL_INFO_LINK:
			return {
				...state,
				detailsLink: action.payload,
			};

		case actions.DISPLAY_TYPE:
			return {
				...state,
				displayType: action.payload,
				displayFile: null,
				displayFileName: "Imagem ou video",
			};

		case actions.PLAN:
			return {
				...state,
				plan: action.payload,
			};

		case actions.CARD_NUMBER:
			return { ...state, cardNumber: action.payload };

		case actions.CHANGE_CATEGORY:
			return { ...state, category: action.payload };

		case actions.CVV:
			if (action.payload.length > 3) {
				return { ...state };
			}
			return { ...state, cvv: action.payload };

		case actions.EXPIRATION_DATE:
			return { ...state, expirationDate: action.payload };

		case actions.CHECKBOX:
			return { ...state, checkbox: action.payload };

		case actions.TRIGGER_LEFT_TRANSITION:
			newNumber = state.leftTransitionTrigger + 1;

			return {
				...state,
				leftTransitionTrigger: newNumber,
			};

		case actions.NEXT_STEP:
			const newStep = state.step + 1;

			if (newStep > state.maxStep)
				return {
					...state,
					step: newStep,
					maxStep: newStep,
				};
			else
				return {
					...state,
					step: newStep,
				};

		case actions.TRIGGER_RIGHT_TRANSITION:
			newNumber = state.rightTransitionTrigger + 1;

			return {
				...state,
				rightTransitionTrigger: newNumber,
			};

		case actions.PREVIOUS_STEP:
			const previousStep = state.step - 1;
			return {
				...state,
				step: previousStep,
			};

		default:
			return state;
	}
};

export default reducer;
