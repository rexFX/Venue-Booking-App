import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0d0d0d",
	},
	heading: {
		fontSize: 25,
		color: "#f95738",
		fontFamily: "SF_Display_Bold",
	},
	subHeading: {
		fontSize: 12,
		color: "#ddbea9",
		fontFamily: "SF_Display_Italic",
	},
	inputStyle: {
		color: "white",
		height: 40,
		width: 275,
		marginVertical: 5,
		borderRadius: 5,
		fontFamily: "SF_Text_Regular",
		backgroundColor: "black",
		paddingVertical: 3,
		paddingHorizontal: 15,
		fontSize: 15,
	},
	inputViewBorder: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		marginVertical: 4,
	},
	createReqBtnContainerStyle: {
		borderRadius: 5,
		width: 120,
		height: 50,
	},
	createReqBtnBtnStyle: {
		borderRadius: 5,
		width: 120,
		height: 50,
	},
	radioButton: {
		height: 35,
		width: 200,
		backgroundColor: "#dbd3d8",
	},
	selectedRadioButton: {
		backgroundColor: "gray",
	},
	selectedRadioButtonText: {
		color: "black",
		fontFamily: "SF_Rounded_Bold",
	},
});
