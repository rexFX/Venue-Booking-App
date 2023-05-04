import { Card } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import Styles from "../screens/Styles";

const RequesterCards = ({ data }) => {
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
								Status:
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
