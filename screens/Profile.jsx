import { Button } from "@rneui/themed";
import { Text, View } from "react-native";
import Styles from "../constants/Styles";
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
			<Text
				style={{
					fontFamily: "SF_Display_Bold",
					fontSize: 40,
				}}
			>
				Welcome,
			</Text>
			<Text
				style={{
					fontFamily: "SF_Display_Bold",
					fontSize: 40,
				}}
			>
				{myUser.user}
			</Text>
			<Button onPress={async () => await myUser.Logout()}>Logout</Button>
		</View>
	);
};

export default Profile;
