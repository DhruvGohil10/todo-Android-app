import React, { createContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
//components
import DropDown from './dropDown';
import Profile from './profile';
import AddTodo from './addTodo';
import Todos from './todos';

let themeContext = createContext();

const Home = ({ user, docId, renderSignIn }) => {
	let uid = user.uid;
	// let [ darkTheme, setDarkTheme ] = useState(false);
	// let [nativeBaseInitialColorMode, setNativeBaseInitialColorMode] = useState('');
	// const { toggleColorMode } = useColorMode();

	// let toggleTheme = () => {
	// 	firestore().collection('users').doc(docId).update({
	// 		darkTheme: !darkTheme
	// 	});

	// 	toggleColorMode();
	// };

	// useEffect(() => {
	// 	const unSubscribe = firestore().collection('users').doc(docId).onSnapshot((docSnapshot) => {
	// 		let value = docSnapshot.data().darkTheme;
	// 		setDarkTheme(value);
	// 		// if(value == false){
	// 		// 	setNativeBaseInitialColorMode('light');
	// 		// }else if(value == true){
	// 		// 	setNativeBaseInitialColorMode('dark');
	// 		// }
	// 	});

	// 	return () => unSubscribe(); // Stop listening for updates when no longer required
	// }, []);

	// useEffect(() => {
	// 	if(darkTheme === true){
	// 		toggleColorMode();
	// 	}
	// }, [])

	// const config = {
	// 	useSystemColorMode: false,
	// 	initialColorMode: 'dark'
	// };
	// const customTheme = extendTheme({ config });

	return (
		// <View style={darkTheme ? styles.homeBackgroundDark : styles.homeBackground}>
		<View style={styles.homeBackgroundDark}>

			{/* <themeContext.Provider value={{ darkTheme, toggleTheme }}> */}
				{/* <NativeBaseProvider theme={customTheme}> */}
				{/* <NativeBaseProvider> */}
					<View style={styles.topContainer}>
						<DropDown renderSignIn={renderSignIn} docId={docId} />
						<Profile docId={docId} />
					</View>

					<Todos user={user} />
				{/* </NativeBaseProvider> */}

				<KeyboardAvoidingView style={styles.addTodo}>
					<AddTodo uid={uid} />
				</KeyboardAvoidingView>
			{/* </themeContext.Provider> */}
		</View>
	);
};

const styles = StyleSheet.create({
	homeBackground: { 
		width: '100%',
		minHeight: '100%',
		position: 'relative',
		backgroundColor: '#fff',
		color: '#000'
	},

	homeBackgroundDark: {
		width: '100%',
		minHeight: '100%',
		position: 'relative',
		backgroundColor: '#1d1d1d'
	},

	topContainer: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center'
	},

	addTodo: {
		position: 'absolute',
		bottom: 15,
		width: '100%'
	}
});

export { Home, themeContext };
