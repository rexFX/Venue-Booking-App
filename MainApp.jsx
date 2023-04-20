import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { Icon } from "@rneui/themed";
import { useFonts } from "expo-font";

import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

import Initialize from "./screens/Initialize";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import { useUserContext } from "./context/context";
import Profile from "./screens/Profile";

import PendingReviewer from "./screens/reviewer/PendingReviewer";
import ApprovedRev from "./screens/reviewer/ApprovedRev";
import DeniedRev from "./screens/reviewer/DeniedRev";

import PendingReq from "./screens/requester/PendingReq";
import ApprovedReq from "./screens/requester/ApprovedReq";
import DeniedReq from "./screens/requester/DeniedReq";
import CreateRequest from "./screens/requester/CreateRequest";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync().catch((err) => console.log(err));

const LoggedIn = () => {
	const myUser = useUserContext();

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Alert.alert(
				remoteMessage.notification.title,
				remoteMessage.notification.body
			);
		});

		return unsubscribe;
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
			}}
		>
			{myUser.userType.current === "reviewer" ? (
				<>
					<Tab.Screen
						name="home"
						component={PendingReviewer}
						options={{
							tabBarLabel: "Pending",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="clock"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="approved"
						component={ApprovedRev}
						options={{
							tabBarLabel: "Approved",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="check"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="denied"
						component={DeniedRev}
						options={{
							tabBarLabel: "Denied",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="x"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="profile"
						component={Profile}
						options={{
							tabBarLabel: "Profile",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="user"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
				</>
			) : (
				<>
					<Tab.Screen
						name="home"
						component={PendingReq}
						options={{
							tabBarLabel: "Pending",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="clock"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="approved"
						component={ApprovedReq}
						options={{
							tabBarLabel: "Approved",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="check"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="denied"
						component={DeniedReq}
						options={{
							tabBarLabel: "Denied",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="x"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="request"
						component={CreateRequest}
						options={{
							tabBarLabel: "Create Request",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="edit-3"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
					<Tab.Screen
						name="profile"
						component={Profile}
						options={{
							tabBarLabel: "Profile",
							tabBarLabelStyle: {
								marginBottom: 4,
								marginTop: -5,
							},
							tabBarIcon: () => {
								return (
									<Icon
										name="user"
										type="feather"
										color="black"
										size={18}
									/>
								);
							},
						}}
					/>
				</>
			)}
		</Tab.Navigator>
	);
};

const NotLoggedIn = () => {
	return (
		<Stack.Navigator
			initialRouteName="Initialize"
			screenOptions={{
				animation: "fade_from_bottom",
				headerShown: false,
			}}
		>
			<Stack.Screen name="Initialize" component={Initialize} />
			<Stack.Screen name="Login" component={LoginPage} />
			<Stack.Screen name="Signup" component={SignupPage} />
		</Stack.Navigator>
	);
};

export default function MainApp() {
	const myUser = useUserContext();

	const [fontsLoaded] = useFonts({
		SF_Display_Bold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
		SF_Display_Italic: require("./assets/fonts/SF-Pro-Display-RegularItalic.otf"),
		SF_Rounded_Regular: require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
		SF_Rounded_Bold: require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
		SF_Rounded_SemiBold: require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
		SF_Rounded_Medium: require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
		SF_Text_Regular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
		SF_Text_Bold: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
	});

	useEffect(() => {
		myUser.initializer();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<NavigationContainer>
				<Stack.Navigator
					id="parentStackNavigator"
					screenOptions={{
						headerTitleStyle: {
							fontSize: 15,
							fontFamily: "SF_Display_Bold",
						},
					}}
				>
					{myUser.isSignedIn ? (
						<Stack.Screen
							name="loggedIn"
							component={LoggedIn}
							myUser={myUser}
						/>
					) : (
						<Stack.Screen
							options={{
								headerShown: false,
							}}
							name="notLoggedIn"
							component={NotLoggedIn}
						/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
