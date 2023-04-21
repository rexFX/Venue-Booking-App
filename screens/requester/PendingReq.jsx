import { FlatList, View, Text, ActivityIndicator } from "react-native";
import RequesterCards from "../../components/RequesterCards";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { REACT_APP_SERVER_URL } from "@env";
import Styles from "../../constants/Styles";

const PendingReq = ({ navigation }) => {
	const [pendingRequests, setPendingRequests] = useState({});
	const [loading, setLoading] = useState(true);
	const myUser = useUserContext();

	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: "Pending requests",
			headerRight: () => {
				return (
					<TouchableOpacity
						onPress={myUser.refreshView}
						hitSlop={{
							top: 15,
							bottom: 15,
							left: 15,
							right: 15,
						}}
					>
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
		setLoading(true);
		axios
			.get(`${REACT_APP_SERVER_URL}/api/v1/getPenRequestsRequester`, {
				headers: {
					Authorization: `Bearer ${myUser.token.current}`,
				},
			})
			.then((res) => {
				setPendingRequests(res.data.reverse());
				setLoading(false);
			})
			.catch((err) => {
				console.log(
					"error in getting pending requests for requester",
					err
				);
				setLoading(false);
			});
	}, [myUser.refresh]);

	const renderItem = ({ item }) => {
		return <RequesterCards data={item} />;
	};

	if (loading) {
		return (
			<View style={Styles.container}>
				<ActivityIndicator color="black" />
			</View>
		);
	}

	if (pendingRequests.length === 0) {
		return (
			<View style={Styles.container}>
				<Text>There are no pending requests</Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				data={pendingRequests}
				renderItem={renderItem}
				keyExtractor={(item) => item.booking_id}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				initialNumToRender={5}
			/>
		</View>
	);
};

export default PendingReq;
