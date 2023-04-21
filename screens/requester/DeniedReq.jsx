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

const DeniedReq = ({ navigation }) => {
	const [deniedRequests, setDeniedRequests] = useState({});
	const [loading, setLoading] = useState(true);
	const myUser = useUserContext();

	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: "Denied requests",
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
			.get(`${REACT_APP_SERVER_URL}/api/v1/getAllRequestsRequester`, {
				headers: {
					Authorization: `Bearer ${myUser.token.current}`,
				},
			})
			.then((res) => {
				setDeniedRequests(
					res.data
						.filter((el) => {
							return el.bookingStatus === "Denied";
						})
						.reverse()
				);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(
					"error in getting denied requests for requester",
					err
				);
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

	if (deniedRequests.length === 0) {
		return (
			<View style={Styles.container}>
				<Text>There are no denied requests</Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				data={deniedRequests}
				renderItem={renderItem}
				keyExtractor={(item) => item.booking_id}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				initialNumToRender={5}
			/>
		</View>
	);
};

export default DeniedReq;
