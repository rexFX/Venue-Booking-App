import { View, TextInput, ActivityIndicator, Text } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import Styles from "./Styles";
import { useState } from "react";
import { useUserContext } from "../context/context";

const LoginPage = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedUserType, setSelectedUserType] = useState("Requester");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorText, setErrorText] = useState("");
	const myUser = useUserContext();

	const emailHandler = (val) => {
		setEmail(val);
	};

	const passwordHandler = (val) => {
		setPassword(val);
	};

	return (
		<View style={Styles.container}>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholderTextColor="gray"
					placeholder="Email Address"
					selectionColor={"black"}
					value={email}
					onChangeText={emailHandler}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Password"
					placeholderTextColor="gray"
					selectionColor={"black"}
					secureTextEntry={true}
					value={password}
					onChangeText={passwordHandler}
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
					marginTop: 40,
					width: 400,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{errorText && (
					<Text
						style={{
							...Styles.subHeading,
							color: "red",
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
							`Login as ${selectedUserType.toLowerCase()}`
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
						myUser.setSigningIn(true);
						let resp = await myUser.signIn(
							email,
							password,
							selectedIndex
						);
						if (resp.status !== 200) {
							setErrorText(resp.data.error);
						}
					}}
				/>
			</View>
		</View>
	);
};

export default LoginPage;
