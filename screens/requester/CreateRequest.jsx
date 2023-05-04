import { Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Dialog, CheckBox, Button } from "@rneui/themed";
import Styles from "../Styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ActivityIndicator } from "react-native";
import { useUserContext } from "../../context/context";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_SERVER_URL } from "@env";

const CreateRequest = ({ navigation }) => {
	const myUser = useUserContext();
	const [eventBrief, setEventBrief] = useState("");
	const [room, setRoom] = useState("");
	const [date, setDate] = useState("");
	const [clubAssociated, setClubAssociated] = useState("");
	const [equipments, setEquipments] = useState("");
	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	const [startTime, setStartTime] = useState("Start Time");
	const [endTime, setEndTime] = useState("End Time");
	const [whichTime, setWhichTime] = useState(1);
	const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
	const [sendingReq, setSendingReq] = useState(false);

	const [approverID, setApproverID] = useState("");
	const [approverName, setApproverName] = useState("");
	const [dialogVisibility, setDialogVisibility] = useState(false);
	const [checked, setChecked] = useState(0);
	const [reqCreatedText, setReqCreatedText] = useState("");
	const [textColor, setTextColor] = useState("green");

	useFocusEffect(() => {
		navigation.getParent("parentStackNavigator").setOptions({
			headerTitle: `Create Request`,
			headerRight: undefined,
		});
	});

	const handleDialogSubmit = () => {
		setApproverID(myUser.reviewers[checked]["id"]);
		setApproverName(myUser.reviewers[checked]["Name"]);
		toggleDialog();
	};

	const toggleDialog = () => {
		setDialogVisibility(!dialogVisibility);
	};

	const hideDatePicker = () => {
		setIsDatePickerVisible(false);
	};

	const showDatePicker = () => {
		setIsDatePickerVisible(true);
	};

	const handleConfirmDate = (date) => {
		let d = new Date(date);
		let dd = d.getDate();
		let mm = d.getMonth() + 1;
		let yyyy = d.getFullYear();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;
		setDate(`${dd}/${mm}/${yyyy}`);
		hideDatePicker();
	};

	const hideTimePicker = () => {
		setIsTimePickerVisible(false);
	};

	const showTimePicker = () => {
		setIsTimePickerVisible(true);
	};

	const handleConfirmTime = (time) => {
		let t = new Date(time);
		let hh = t.getHours();
		let mm = t.getMinutes();

		if (hh < 10) hh = "0" + hh;
		if (mm < 10) mm = "0" + mm;
		if (whichTime == 1) setStartTime(`${hh}:${mm}`);
		else setEndTime(`${hh}:${mm}`);
		hideTimePicker();
	};

	const handleSubmit = () => {
		if (
			eventBrief.length > 0 &&
			room.length > 0 &&
			clubAssociated.length > 0 &&
			equipments.length > 0 &&
			date.length > 0 &&
			startTime.length > 0 &&
			endTime.length > 0 &&
			approverID.length > 0
		) {
			setSendingReq(true);
			axios
				.post(
					`${REACT_APP_SERVER_URL}/api/v1/createRequest`,
					{
						room: room,
						eventBrief: eventBrief,
						date: date,
						time_start_hours: startTime.split(":")[0],
						time_start_minutes: startTime.split(":")[1],
						time_end_hours: endTime.split(":")[0],
						time_end_minutes: endTime.split(":")[1],
						clubAssociated: clubAssociated,
						ApprovalAskedBy: approverID,
						equipmentRequired: equipments,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${myUser.token.current}`,
						},
					}
				)
				.then((res) => {
					console.log(res.data);
					setReqCreatedText(
						`Request created successfully for booking ID: ${res.data.bookingID}`
					);
					setTextColor("green");
					setSendingReq(false);
				})
				.catch((err) => {
					setReqCreatedText(err.response.data.message);
					setTextColor("red");
					setSendingReq(false);
				});
		}
	};

	return (
		<View style={Styles.container}>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Event Brief"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"white"}
					value={eventBrief}
					onChangeText={(val) => {
						setEventBrief(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Room"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"white"}
					value={room}
					onChangeText={(val) => {
						setRoom(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Club Associated"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"white"}
					value={clubAssociated}
					onChangeText={(val) => {
						setClubAssociated(val);
					}}
				/>
			</View>
			<View style={Styles.inputViewBorder}>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Equipments Required"
					placeholderTextColor="gray"
					autoComplete="off"
					selectionColor={"white"}
					value={equipments}
					onChangeText={(val) => {
						setEquipments(val);
					}}
				/>
			</View>
			<View style={{ width: 300 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						marginVertical: 10,
					}}
				>
					<View>
						<Button
							title={date.length > 0 ? `${date}` : "Date"}
							onPress={showDatePicker}
							raised="true"
							titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
							color="black"
							containerStyle={Styles.createReqBtnContainerStyle}
							buttonStyle={Styles.createReqBtnBtnStyle}
						/>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirmDate}
							onCancel={hideDatePicker}
						/>
					</View>
					<View>
						<Button
							title={
								approverName.length > 0
									? `${approverName}`
									: "Reviewer"
							}
							onPress={toggleDialog}
							raised="true"
							color="black"
							containerStyle={Styles.createReqBtnContainerStyle}
							buttonStyle={Styles.createReqBtnBtnStyle}
						/>
						<Dialog
							isVisible={dialogVisibility}
							onBackdropPress={toggleDialog}
						>
							<Dialog.Title title="Reviewers" />
							<Text>
								Select your reviewer who will check your
								application
							</Text>
							{myUser.reviewers.map((el, index) => {
								return (
									<CheckBox
										key={index}
										title={el.Name}
										containerStyle={{
											backgroundColor: "white",
											borderWidth: 0,
										}}
										checkedIcon="dot-circle-o"
										uncheckedIcon="circle-o"
										checked={checked === index}
										onPress={() => setChecked(index)}
									/>
								);
							})}
							<Dialog.Actions>
								<Dialog.Button
									title="Confirm"
									onPress={handleDialogSubmit}
								/>
								<Dialog.Button
									title="Cancel"
									onPress={toggleDialog}
								/>
								<Dialog.Button
									title="Refresh"
									onPress={myUser.refreshReviewers}
								/>
							</Dialog.Actions>
						</Dialog>
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					<View>
						<Button
							title={startTime}
							onPress={() => {
								setWhichTime(1);
								showTimePicker();
							}}
							raised="true"
							titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
							color="black"
							containerStyle={Styles.createReqBtnContainerStyle}
							buttonStyle={Styles.createReqBtnBtnStyle}
						/>
						<DateTimePickerModal
							isVisible={isTimePickerVisible}
							mode="time"
							onConfirm={handleConfirmTime}
							onCancel={hideTimePicker}
						/>
					</View>
					<View>
						<Button
							title={endTime}
							onPress={() => {
								setWhichTime(2);
								showTimePicker();
							}}
							raised="true"
							titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
							color="black"
							containerStyle={Styles.createReqBtnContainerStyle}
							buttonStyle={Styles.createReqBtnBtnStyle}
						/>
						<DateTimePickerModal
							isVisible={isTimePickerVisible}
							mode="time"
							onConfirm={handleConfirmTime}
							onCancel={hideTimePicker}
						/>
					</View>
				</View>
			</View>
			<View>
				<Button
					title={
						sendingReq ? (
							<ActivityIndicator color={"#ffffff"} />
						) : (
							`Create Request`
						)
					}
					onPress={handleSubmit}
					raised="true"
					titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
					containerStyle={{
						marginTop: 12,
						borderRadius: 5,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 5,
					}}
				/>
			</View>
			{reqCreatedText && (
				<Text
					style={{
						...Styles.subHeading,
						width: 250,
						textAlign: "center",
						color: textColor,
						marginTop: 8,
					}}
				>
					{reqCreatedText}
				</Text>
			)}
		</View>
	);
};

export default CreateRequest;
