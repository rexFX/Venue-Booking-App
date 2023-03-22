import { Button } from "@rneui/themed";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../constants/Styles";

const Initialize = ({ navigation }) => {
	return (
		<SafeAreaView style={Styles.container}>
			<Text style={Styles.heading}>Venue Booking App</Text>
			<Text style={Styles.subHeading}>Hassle Free Booking</Text>
			<Button
				title={"Login"}
				raised={"true"}
				containerStyle={{
					marginTop: 60,
					marginBottom: 10,
					borderRadius: 12,
				}}
				buttonStyle={{
					height: 50,
					width: 150,
					borderRadius: 12,
				}}
				titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
				onPress={() => navigation.navigate("Login")}
			/>
			<Button
				title={"Signup"}
				raised={"true"}
				containerStyle={{
					borderRadius: 12,
				}}
				titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
				buttonStyle={{
					height: 50,
					width: 150,
					borderRadius: 12,
				}}
				onPress={() => navigation.navigate("Signup")}
			/>
		</SafeAreaView>
	);
};

export default Initialize;
