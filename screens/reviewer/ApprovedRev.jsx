import { FlatList, Text, View, ActivityIndicator } from "react-native";
import RequesterCards from "../../components/RequesterCards";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { REACT_APP_SERVER_URL } from "@env";
import Styles from "../../constants/Styles";

const ApprovedRev = ({ navigation }) => {
	const [approvedRequests, setApprovedRequests] = useState({});
	const [loading, setLoading] = useState(true);
	const myUser = useUserContext();

	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: "Approved requests",
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
		setLoading(true);
		axios
			.get(`${REACT_APP_SERVER_URL}/api/v1/getAppRequestsReviewers`, {
				headers: {
					Authorization: `Bearer ${myUser.token.current}`,
				},
			})
			.then((res) => {
				setApprovedRequests(res.data.reverse());
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(
					"error in getting approved requests for reviewer",
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

	if (approvedRequests.length === 0) {
		return (
			<View style={Styles.container}>
				<Text>There are no approved requests</Text>
			</View>
		);
	}

	return (
		<SafeAreaView>
			<FlatList
				data={approvedRequests}
				renderItem={renderItem}
				keyExtractor={(item) => item.booking_id}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				initialNumToRender={5}
			/>
		</SafeAreaView>
	);
};

export default ApprovedRev;
