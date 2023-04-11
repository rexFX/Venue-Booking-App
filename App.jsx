import { UserContextProvider } from "./context/context";
import MainApp from "./MainApp";

import { PermissionsAndroid } from "react-native";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
	return (
		<UserContextProvider>
			<MainApp />
		</UserContextProvider>
	);
};

export default App;
