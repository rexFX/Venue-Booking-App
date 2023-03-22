import { Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
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
		<SafeAreaView style={Styles.container}>
			<Button onPress={async () => await myUser.Logout()}>Logout</Button>
		</SafeAreaView>
	);
};

export default Profile;
