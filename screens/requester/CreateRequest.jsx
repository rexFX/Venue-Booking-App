import { Text, View, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dialog, CheckBox, Button } from "@rneui/themed";
import Styles from "../../constants/Styles";
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

	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [whichTime, setWhichTime] = useState(1);
	const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
	const [sendingReq, setSendingReq] = useState(false);

	const [approverID, setApproverID] = useState("");
	const [approverName, setApproverName] = useState("");
	const [dialogVisibility, setDialogVisibility] = useState(false);
	const [checked, setChecked] = useState(0);

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
		setSendingReq(true);
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
					setSendingReq(false);
				})
				.catch((err) => {
					console.log(err);
					setSendingReq(false);
				});
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Event Brief"
					autoComplete="off"
					selectionColor={"black"}
					value={eventBrief}
					onChangeText={(val) => {
						setEventBrief(val);
					}}
				/>
			</View>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Room"
					autoComplete="off"
					selectionColor={"black"}
					value={room}
					onChangeText={(val) => {
						setRoom(val);
					}}
				/>
			</View>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Club Associated"
					autoComplete="off"
					selectionColor={"black"}
					value={clubAssociated}
					onChangeText={(val) => {
						setClubAssociated(val);
					}}
				/>
			</View>
			<View>
				<TextInput
					style={Styles.inputStyle}
					placeholder="Equipments Required"
					autoComplete="off"
					selectionColor={"black"}
					value={equipments}
					onChangeText={(val) => {
						setEquipments(val);
					}}
				/>
			</View>
			<View>
				<Button
					title={date.length > 0 ? `${date}` : "Choose Date"}
					onPress={showDatePicker}
					raised="true"
					titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
					color="black"
					containerStyle={{
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 12,
					}}
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
						"Start Time" +
						`${startTime.length > 0 ? `:  ${startTime}` : ""}`
					}
					onPress={() => {
						setWhichTime(1);
						showTimePicker();
					}}
					raised="true"
					titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
					color="black"
					containerStyle={{
						margin: 5,
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 12,
					}}
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
					title={
						"End Time" +
						`${endTime.length > 0 ? `:  ${endTime}` : ""}`
					}
					onPress={() => {
						setWhichTime(2);
						showTimePicker();
					}}
					raised="true"
					titleStyle={{ fontFamily: "SF_Rounded_SemiBold" }}
					color="black"
					containerStyle={{
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 12,
					}}
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
					title={
						approverName.length > 0
							? `${approverName}`
							: "Select Your Reviewer"
					}
					onPress={toggleDialog}
					raised="true"
					color="black"
					containerStyle={{
						margin: 5,
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 12,
					}}
				/>
				<Dialog
					isVisible={dialogVisibility}
					onBackdropPress={toggleDialog}
				>
					<Dialog.Title title="Reviewers" />
					<Text>
						Select your reviewer who will check your application
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
						<Dialog.Button title="Cancel" onPress={toggleDialog} />
						<Dialog.Button
							title="Refresh"
							onPress={myUser.refreshReviewers}
						/>
					</Dialog.Actions>
				</Dialog>
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
						marginTop: 10,
						borderRadius: 12,
					}}
					buttonStyle={{
						width: 250,
						borderRadius: 12,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CreateRequest;
