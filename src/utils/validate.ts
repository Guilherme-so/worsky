import { LOGO_FILE_SIZE, VIDEO_FILE_SIZE } from "../constants/config";
import { displayType } from "../components/Dashboard/utils/displayTypes";

export const isValidEmail = (email: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email.toLowerCase());
};

export const isEmptyString = (string: string) => string.length === 0;

export const validateDisplayTypeUpload = (
	uploadType: string,
	file: {
		name: string;
		size: number;
	},
) => {
	if (
		uploadType === displayType.BANNER &&
		!file.name.match(/\.(jpg|jpeg|png|gif)$/)
	)
		throw new Error("The banner has to be an image");

	if (uploadType === displayType.BANNER && file.size > LOGO_FILE_SIZE)
		throw new Error("The banner has to be 10 megabytes or smaller");

	if (
		uploadType === displayType.VIDEO &&
		!file.name.match(/\.(mkv|mp4|webm)$/)
	)
		throw new Error("The video has to be valid video format");

	if (uploadType === displayType.VIDEO && file.size > VIDEO_FILE_SIZE)
		throw new Error("The video has to be 20 megabytes or smaller");
};

export const isValidLink = (link: string) => {
	const regex = /^(http:\/\/|https:\/\/).+$/;

	return regex.test(link);
};
