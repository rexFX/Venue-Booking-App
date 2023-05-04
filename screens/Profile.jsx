import { Button } from "@rneui/themed";
import { Text, View } from "react-native";
import Styles from "./Styles";
import { useUserContext } from "../context/context";
import { useFocusEffect } from "@react-navigation/native";

const Profile = ({ navigation }) => {
	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: `Profile`,
			headerRight: undefined,
		});
	});

	const myUser = useUserContext();

	return (
		<View style={Styles.container}>
			<View style={{ flex: 1, flexDirection: "column", width: "80%" }}>
				<Text
					style={{
						fontFamily: "SF_Display_Bold",
						fontSize: 30,
						color: "white",
					}}
				>
					Welcome,
				</Text>
				<Text
					style={{
						fontFamily: "SF_Display_Bold",
						fontSize: 40,
						color: "white",
					}}
				>
					{myUser.user}
				</Text>
				<Button onPress={async () => await myUser.Logout()}>
					Logout
				</Button>
			</View>
		</View>
	);
};

export default Profile;
