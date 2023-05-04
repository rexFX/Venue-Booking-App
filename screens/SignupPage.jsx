import { Text, View, TextInput, ActivityIndicator } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import Styles from "./Styles";
import { useState } from "react";
import { useUserContext } from "../context/context";

const SignupPage = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedUserType, setSelectedUserType] = useState("Requester");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [designation, setDesignation] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorText, setErrorText] = useState("");
	const [errorColor, setErrorColor] = useState("");
	const myUser = useUserContext();

	return (
		<View style={Styles.container}>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Full Name"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"black"}
					value={name}
					onChangeText={(val) => {
						setName(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Email Address"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"black"}
					value={email}
					onChangeText={(val) => {
						setEmail(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder={selectedIndex === 0 ? "Batch" : "Designation"}
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"black"}
					value={designation}
					onChangeText={(val) => {
						setDesignation(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Password"
					placeholderTextColor="gray"
					selectionColor={"black"}
					autoComplete="off"
					secureTextEntry={true}
					value={password}
					onChangeText={(val) => {
						setPassword(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Confirm Password"
					placeholderTextColor="gray"
					selectionColor={"black"}
					autoComplete="off"
					secureTextEntry={true}
					value={confirmPassword}
					onChangeText={(val) => {
						setConfirmPassword(val);
					}}
				/>
			</View>
			<ButtonGroup
				buttons={["Requester", "Approver"]}
				selectedIndex={selectedIndex}
				selectedButtonStyle={Styles.selectedRadioButton}
				selectedTextStyle={Styles.selectedRadioButtonText}
				onPress={(value) => {
					setSelectedIndex(value);
					setSelectedUserType(
						value === 0 ? "a Requester" : "an Approver"
					);
				}}
				containerStyle={Styles.radioButton}
				textStyle={{
					fontFamily: "SF_Rounded_Regular",
					color: "gray",
				}}
			/>
			<View
				style={{
					marginTop: 30,
					width: 400,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{errorText.length > 0 && (
					<Text
						style={{
							...Styles.subHeading,
							color: errorColor,
						}}
					>
						{errorText}
					</Text>
				)}
				<Button
					title={
						myUser.signingIn ? (
							<ActivityIndicator color={"#ffffff"} />
						) : (
							`Signup as ${selectedUserType.toLowerCase()}`
						)
					}
					raised="true"
					titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
					containerStyle={{
						marginTop: 10,
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 200,
						height: 50,
						borderRadius: 12,
					}}
					onPress={async () => {
						if (
							password === confirmPassword &&
							password.length > 0 &&
							name.length > 0 &&
							designation.length > 0
						) {
							myUser.setSigningIn(true);
							let resp = await myUser.signUp(
								name,
								email,
								designation,
								password,
								selectedUserType
							);
							if (resp.status !== 200) {
								setErrorText(resp.data.error);
								setErrorColor("red");
							} else {
								setErrorText(
									"Account created successfully. Please Login"
								);
								setErrorColor("green");
							}
						}
					}}
				/>
			</View>
		</View>
	);
};

export default SignupPage;
