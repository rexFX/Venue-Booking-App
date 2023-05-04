import { Button, Card } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import Styles from "../screens/Styles";
import { useUserContext } from "../context/context";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "@env";

const ApproverCards = ({ data }) => {
	const myUser = useUserContext();
	const [deny, setDeny] = useState(false);
	const [approve, setApprove] = useState(false);
	const [animate, setAnimate] = useState(false);

	const AcceptHandler = () => {
		setAnimate(true);
		axios
			.post(
				`${REACT_APP_SERVER_URL}/api/v1/approve`,
				{
					booking_id: data.booking_id,
				},
				{
					headers: {
						Authorization: `Bearer ${myUser.token.current}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				setApprove(true);
				setAnimate(false);
			})
			.catch((err) => {
				console.log("error in approval", err);
				setAnimate(false);
			});
	};

	const RejectHandler = () => {
		setAnimate(true);
		axios
			.post(
				`${REACT_APP_SERVER_URL}/api/v1/deny`,
				{
					booking_id: data.booking_id,
				},
				{
					headers: {
						Authorization: `Bearer ${myUser.token.current}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				setDeny(true);
				setAnimate(false);
			})
			.catch((err) => {
				console.log("error in approval", err);
				setAnimate(false);
			});
	};

	return (
		<View style={Styles.container}>
			<Card
				key={data.booking_id}
				containerStyle={{
					borderRadius: 10,
					width: "90%",
					flexBasis: "auto",
					backgroundColor: "#101412",
				}}
			>
				<Card.Title>
					<Text
						style={{
							fontFamily: "SF_Text_Bold",
							color: "white",
						}}
					>
						{data.eventBrief}
					</Text>
				</Card.Title>
				<Card.Divider />

				<View
					style={{
						width: "90%",
						marginHorizontal: "5%",
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Date:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.date}
							</Text>
						</View>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Room No:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.room}
							</Text>
						</View>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Start Time:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.time_start_hours}:
								{data.time_start_minutes}
							</Text>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								End Time:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.time_end_hours}:{data.time_end_minutes}
							</Text>
						</View>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Equipments:
							</Text>
						</View>
						<View
							style={{
								width: "50%",
							}}
						>
							<ScrollView
								horizontal={true}
								contentContainerStyle={{
									flex: 1,
									justifyContent: "flex-end",
								}}
							>
								<Text
									style={{
										fontFamily: "SF_Text_Regular",
										color: "white",
									}}
								>
									{data.equipmentRequired}
								</Text>
							</ScrollView>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Club Associated:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.clubAssociated}
							</Text>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Bold",
									color: "white",
								}}
							>
								Booking ID:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
									color: "white",
								}}
							>
								{data.booking_id}
							</Text>
						</View>
					</View>
					<View
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Button
							onPress={AcceptHandler}
							title={
								animate ? (
									<ActivityIndicator color={"#ffffff"} />
								) : approve ? (
									"Accepted"
								) : (
									"Accept"
								)
							}
							disabled={approve || deny}
							raised={"true"}
							size={"lg"}
							containerStyle={{
								width: 120,
								marginTop: 10,
								borderRadius: 5,
							}}
							buttonStyle={{
								borderRadius: 5,
								backgroundColor: "#339989",
							}}
							titleStyle={{
								fontFamily: "SF_Rounded_SemiBold",
							}}
						/>
						<Button
							onPress={RejectHandler}
							title={
								animate ? (
									<ActivityIndicator color={"#ffffff"} />
								) : deny ? (
									"Rejected"
								) : (
									"Reject"
								)
							}
							disabled={approve || deny}
							raised={"true"}
							size={"lg"}
							containerStyle={{
								width: 120,
								marginTop: 10,
								borderRadius: 5,
							}}
							buttonStyle={{
								borderRadius: 5,
								backgroundColor: "#bb4430",
							}}
							titleStyle={{
								fontFamily: "SF_Rounded_SemiBold",
							}}
						/>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default ApproverCards;
