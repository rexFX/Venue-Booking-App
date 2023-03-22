import { Button, Card } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import Styles from "../constants/Styles";
import { useUserContext } from "../context/context";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import axios from "axios";

const ApproverCards = ({ data }) => {
	const myUser = useUserContext();
	const [deny, setDeny] = useState(false);
	const [approve, setApprove] = useState(false);
	const [animate, setAnimate] = useState(false);

	const AcceptHandler = () => {
		setAnimate(true);
		axios
			.post(
				"https://venuebooking.onrender.com/api/v1/approve",
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
				"https://venuebooking.onrender.com/api/v1/deny",
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
				}}
			>
				<Card.Title>
					<Text
						style={{
							fontFamily: "SF_Text_Bold",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Date:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Room No:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Start Time:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								End Time:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Club Associated:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Booking ID:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
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
							justifyContent: "space-around",
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
								marginTop: 10,
								borderRadius: 12,
							}}
							buttonStyle={{
								borderRadius: 12,
								backgroundColor: "#rgb(0, 200, 0)",
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
								marginTop: 10,
								borderRadius: 12,
							}}
							buttonStyle={{
								borderRadius: 12,
								backgroundColor: "#rgb(200, 0, 0)",
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
