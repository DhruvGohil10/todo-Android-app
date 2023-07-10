import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TodoUserNameInput from './todoUserNameInput';
import firestore from '@react-native-firebase/firestore';
// import { themeContext } from './home';


const Profile = ({ docId }) => {
	const [ todoUserName, setTodoUserName ] = useState('');
	const [ isTodoUserName, setIsTodoUserName ] = useState(false);
	// const { darkTheme } = useContext(themeContext);


	useEffect(() => {

		const unSubscribe = firestore()
				.collection('users')
				.doc(docId)
				.onSnapshot((docSnapshot) => {
					let checkTodoUserName = docSnapshot.data().todoUserName;
					setTodoUserName(checkTodoUserName);

					if (!checkTodoUserName == '') {
						setIsTodoUserName(true);
					}

					if (checkTodoUserName == ''){
						setIsTodoUserName(false)
					}
				});

			// Stop listening for updates when no longer required
			return () => unSubscribe();
	}, [])

	return (
		<View style={styles.profileContainer}>
			{isTodoUserName ? (
				// <Text style={darkTheme ? styles.todoUserNameDark : styles.todoUserName}>{todoUserName}</Text>
				<Text style={styles.todoUserNameDark}>{todoUserName}</Text>

			) : (
				<TodoUserNameInput docId={docId} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		display: 'flex',
	   alignItems: 'center'

	},

	todoUserName: {
		fontSize: 70,
		color: '#000',
		marginTop: 5,
		fontFamily: 'sacramento',
	},

	todoUserNameDark: {
		fontSize: 52,
		color: '#fff',
		marginTop: 5,
		fontFamily: 'sacramento',
	}
});

export default Profile;
