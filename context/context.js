import axios from "axios";
import { createContext, useContext, useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [signingIn, setSigningIn] = useState(false);
	const [reviewers, setReviewers] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [user, setUser] = useState('');
	const userType = useRef('');
	const token = useRef('');

	const initializer = () => {
		AsyncStorage.getItem("signedIn", (err, result) => {
			if (!err) {
				if (result !== null) setIsSignedIn(result === 'true' ? true : false);
				else setIsSignedIn(false);
			}
		})

		AsyncStorage.getItem("user", (err, result) => {
			if (!err) {
				if (result !== null) setUser(result);
			}
		})

		AsyncStorage.getItem("userType", (err, result) => {
			if (!err) {
				if (result !== null) userType.current = result;
			}
		})

		AsyncStorage.getItem("token", (err, result) => {
			if (!err) {
				if (result !== null) token.current = result;
			}
		})

		if (token.length > 0) {
			axios.get('https://venuebooking.onrender.com/api/v1/getReviewers', {
				headers: {
					Authorization: `Bearer ${token.current}`
				}
			})
				.then((res) => {
					setReviewers(res.data);
				})
				.catch(err => console.log('error in fetching reviewer list', err));
		}
	};

	const refreshView = () => {
		setRefresh(!refresh);
	};

	const signInHandler = async (res, type) => {

		await AsyncStorage.setItem('signedIn', 'true');
		await AsyncStorage.setItem('user', res.data.user.name);
		await AsyncStorage.setItem('userType', type);
		await AsyncStorage.setItem('token', res.data.token);
		setUser(res.data.user.name);
		userType.current = type;
		token.current = res.data.token;

		axios.get('https://venuebooking.onrender.com/api/v1/getReviewers', {
			headers: {
				Authorization: `Bearer ${res.data.token}`,
			},
		})
			.then((ress) => {
				setReviewers(ress.data);
			})
			.catch(err => console.log('error in fetching reviewer list', err));

		setIsSignedIn(true);
		setSigningIn(false);
	}

	const signIn = async (email, password, selectedIndex) => {
		if (selectedIndex === 1) {
			await axios.post("https://venuebooking.onrender.com/api/v1/reviewer/login", {
				"email": email,
				"password": password
			},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(async (res) => {
					await signInHandler(res, 'reviewer');
				})
				.catch((err) => {
					console.log('error in signing in reviewer', err);
					setSigningIn(false);
				})
		}
		else {
			await axios.post("https://venuebooking.onrender.com/api/v1/user/login", {
				"email": email,
				"password": password
			},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(async (res) => {
					await signInHandler(res, 'requester');
				})
				.catch((err) => {
					console.log('error in signing in requester', err);
					setSigningIn(false);
				})
		}
	};


	const signUp = async (name, email, designation, password, userType) => {
		let data;
		if (userType === "Requester") {
			await axios.post("https://venuebooking.onrender.com/api/v1/user/signup", {
				"email": email,
				"password": password,
				"full_name": name,
				"batch": designation
			},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then((res) => {
					setSigningIn(false);
					data = res;
				})
				.catch((err) => {
					setSigningIn(false);
					data = err.response;
				})
		}
		else {
			await axios.post("https://venuebooking.onrender.com/api/v1/reviewer/signup", {
				"email": email,
				"password": password,
				"full_name": name,
				"designation": designation
			},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then((res) => {
					setSigningIn(false);
					data = res;
				})
				.catch((err) => {
					setSigningIn(false);
					data = err.response;
				})
		}
		return data;
	}

	const Logout = async () => {
		await AsyncStorage.removeItem('signedIn');
		await AsyncStorage.removeItem('user');
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('userType');
		setUser('');
		userType.current = '';
		token.current = '';
		setIsSignedIn(false);
	}

	return <UserContext.Provider value={{
		isSignedIn,
		initializer,
		signIn,
		Logout,
		user,
		signingIn,
		setSigningIn,
		userType,
		signUp,
		token,
		reviewers,
		refresh,
		refreshView
	}}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	return useContext(UserContext);
};
