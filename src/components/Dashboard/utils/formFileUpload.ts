import { LOGO_FILE_SIZE } from "../../../constants/config";
import {
	setUploadedFile,
	setUploadedDisplayFile,
} from "../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import { validateDisplayTypeUpload } from "../../../utils/validate";

export const uploadFile = (event: any, dispatch: any) => {
	if (event.target.files && event.target.files?.length) {
		const file = event.target.files[0];

		if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
			alert("The logo has to be an image");
			return;
		}

		if (file.size > LOGO_FILE_SIZE) {
			alert("The logo has to be 10 megabytes or smaller");
			return;
		}

		dispatch(setUploadedFile({ logo_file: file, logo_name: file.name }));
	}
};

export const uploadDisplayType = (
	event: any,
	dispatch: any,
	uploadDisplayType: string,
) => {
	if (event.target.files && event.target.files?.length) {
		const file = event.target.files[0];

		try {
			validateDisplayTypeUpload(uploadDisplayType, {
				name: file.name,
				size: file.size,
			});
		} catch (error: any) {
			alert(error.message);
			return;
		}

		dispatch(
			setUploadedDisplayFile({
				display_file: file,
				display_file_name: file.name,
			}),
		);
	}
};
