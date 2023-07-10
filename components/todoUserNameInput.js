import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import { themeContext } from './home';

const TodoUserNameInput = ({ docId }) => {
	const [ input, setInput ] = useState('');
	// const { darkTheme } = useContext(themeContext);

	const handlePress = () => {
		if(!input == ''){
			firestore()
			.collection('users')
			.doc(docId)
			.update({
				todoUserName: input
			}).then(() => setInput(''))
		}
	};

	return (
		<View style={styles.userNameContainer}>
			{/* <Text style={darkTheme ? styles.titleDark : styles.title}>Your Display Name ^_^</Text> */}
			<Text style={styles.titleDark}>Your Display Name ^_^</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder='Display name'
					value={input}
					onChangeText={setInput}
					style={styles.input}
				/>

				<Pressable style={styles.button} onPress={handlePress}>
					<Text style={styles.text}>Add</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userNameContainer: {
		marginLeft: 40,
		marginTop: 15,
		marginBottom: 15
	},

	// title: {
	// 	fontSize: 20,
	// 	color: '#000',
	// 	fontFamily: 'montserrat',
	// 	fontWeight: 'bold'
	// },

	titleDark: {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'montserrat',
		fontWeight: 'bold'
	},

	input: {
		borderBottomColor: '#000',
		borderBottomWidth: 2,
		width: 160,
		paddingVertical: 6,
		fontSize: 16,
		fontFamily: 'montserrat',
		backgroundColor: '#D8D7D7',
		marginTop: 15,
		paddingLeft: 7,
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7
	},

	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		width: 100,
		borderRadius: 7,
		elevation: 3,
		marginTop: 15,
		backgroundColor: '#343434'
	},
	text: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: 'bold',
		fontFamily: 'montserrat',
		letterSpacing: 1,
		color: 'white'
	},

	inputContainer: {
		display: 'flex',
		flexDirection: 'row'
	}
});

export default TodoUserNameInput;
