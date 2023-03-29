import { AdCategory } from "redux/slices/dashboardSlice/dashboardInterfaces";
import Plan from "../../../../redux/interfaces/Plan";

export default interface stepsState {
	step: number;
	maxStep: number;
	name: string;
	logoFile: null | File;
	logoName: string;
	additionalInformation: string;
	detailsLink: string;
	location: any;
	displayType: string;
	displayFile: null | File;
	displayFileName: string;
	plan: Plan | null;
	cardNumber: string;
	cvv?: number;
	expirationDate: string;
	checkbox: boolean;
	locations: [];
	search: string;
	position: any;
	leftTransitionTrigger: number;
	rightTransitionTrigger: number;
	category: AdCategory | null;
}
