import { FlatList } from "react-native";
import ApproverCards from "../../components/ApproverCards";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

const Reviewer = ({ navigation }) => {
	const [pendingRequests, setPendingRequests] = useState({});
	const myUser = useUserContext();

	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: `Welcome, ${myUser.user}`,
			headerRight: () => {
				return (
					<TouchableOpacity onPress={myUser.refreshView}>
						<Icon
							name="refresh-cw"
							type="feather"
							color="black"
							size={18}
						/>
					</TouchableOpacity>
				);
			},
		});
	});

	useEffect(() => {
		axios
			.get(
				"https://venuebooking.onrender.com/api/v1/getAllRequestsReviewers",
				{
					headers: {
						Authorization: `Bearer ${myUser.token.current}`,
					},
				}
			)
			.then((res) => {
				setPendingRequests(res.data.reverse());
			})
			.catch((err) =>
				console.log("error in getting requests for reviewer", err)
			);
	}, [myUser.refresh]);

	const renderItem = ({ item }) => {
		return <ApproverCards data={item} />;
	};

	return (
		<SafeAreaView>
			<FlatList
				data={pendingRequests}
				renderItem={renderItem}
				keyExtractor={(item) => item.booking_id}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				initialNumToRender={5}
			/>
		</SafeAreaView>
	);
};

export default Reviewer;
