import { displayType } from "../../../../components/Dashboard/utils/displayTypes";
import stepsState from "./StepsStateInterface";

const initialState: stepsState = {
	step: 1,
	maxStep: 1,
	logoFile: null,
	logoName: "Choose a image 640 x 640",
	additionalInformation: "",
	detailsLink: "",
	name: "",
	location: null,
	displayType: displayType.DISPLAY,
	displayFile: null,
	displayFileName: "Image or video",
	plan: null,
	cardNumber: "",
	cvv: undefined,
	expirationDate: "",
	checkbox: false,
	locations: [],
	search: "",
	position: null,
	leftTransitionTrigger: 0,
	rightTransitionTrigger: 0,
	category: null,
};

export default initialState;
