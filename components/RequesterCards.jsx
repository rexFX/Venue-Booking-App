import { Card } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import Styles from "../constants/Styles";

const RequesterCards = ({ data }) => {
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
							display: "flex",
							flexDirection: "row",
							alignItems: "baseline",
						}}
					>
						<View style={{ width: "50%" }}>
							<Text style={{ fontFamily: "SF_Text_Bold" }}>
								Status:
							</Text>
						</View>
						<View style={{ width: "50%" }}>
							<Text
								style={{
									fontFamily: "SF_Text_Regular",
									textAlign: "right",
								}}
							>
								{data.bookingStatus}
							</Text>
						</View>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default RequesterCards;
