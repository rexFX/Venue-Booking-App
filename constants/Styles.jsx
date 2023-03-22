import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	heading: {
		fontSize: 25,
		color: "purple",
		fontFamily: "SF_Display_Bold",
	},
	subHeading: {
		fontSize: 12,
		color: "black",
		fontFamily: "SF_Display_Italic",
	},
	inputStyle: {
		height: 35,
		width: 250,
		marginVertical: 5,
		borderRadius: 5,
		paddingHorizontal: 4,
		fontFamily: "SF_Text_Regular",
		backgroundColor: "white",
		paddingVertical: 3,
		paddingHorizontal: 6,
		fontSize: 15,
	},
	radioButton: {
		height: 35,
		width: 200,
	},
	selectedRadioButton: {
		backgroundColor: "#87ceeb",
	},
	selectedRadioButtonText: {
		color: "black",
		fontFamily: "SF_Rounded_Bold",
	},
});
