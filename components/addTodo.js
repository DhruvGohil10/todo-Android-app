import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, View, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddTodo = ({ uid }) => {
	const [ input, setInput ] = useState('');

	const handlePress = () => {
		let value = input;
		if (!input == '') {
			firestore()
				.collection('todos')
				.add({
					todo: value,
					uid: uid,
					completed: false,
					todoId: '',
					Timestamp: firestore.FieldValue.serverTimestamp()
				})
				.then(() => setInput(''));
		}

		setInput('');
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput placeholder='Todo' value={input} onChangeText={setInput} style={styles.input} />

			<Pressable style={styles.button} onPress={handlePress}>
				<Text style={styles.text}>Add</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		position: 'relative',
		height: 50
	},

	input: {
		flex: 1,
		height: '100%',
		fontSize: 17,
		fontFamily: 'montserrat',
		backgroundColor: '#b9b9b9',
		borderRadius: 50,
		paddingLeft: 25
	},

	button: {
		position: 'absolute',
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: 116,
		borderRadius: 50,
		elevation: 3,
		backgroundColor: '#343434'
	},
	text: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: 'bold',
		fontFamily: 'montserrat',
		letterSpacing: 1,
		color: 'white'
	}
});

export default AddTodo;
