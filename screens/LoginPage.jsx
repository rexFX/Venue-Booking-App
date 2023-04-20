import { View, TextInput, ActivityIndicator, Text } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import Styles from "../constants/Styles";
import { useState } from "react";
import { useUserContext } from "../context/context";
import { SafeAreaView } from "react-native-safe-area-context";

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
		<SafeAreaView style={Styles.container}>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Email Address"
					selectionColor={"black"}
					value={email}
					onChangeText={emailHandler}
				/>
			</View>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Password"
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
		</SafeAreaView>
	);
};

export default LoginPage;
