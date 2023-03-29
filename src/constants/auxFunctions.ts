export const defineDisplayType = (type: string) => {
	switch (type) {
		case "DISPLAY":
			return "Display";
		case "BANNER":
			return "Banner";
		case "VIDEO":
			return "Video";
	}
};

export const formatDescription = (description: string) => {
	if (description.length > 30) {
		const newDescription = description.slice(27, -27);
		return newDescription + "...";
	}

	return description;
};
