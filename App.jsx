import { UserContextProvider } from "./context/context";
import MainApp from "./MainApp";

const App = () => {
	return (
		<UserContextProvider>
			<MainApp />
		</UserContextProvider>
	);
};

export default App;
