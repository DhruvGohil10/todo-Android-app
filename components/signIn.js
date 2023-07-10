import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: '485330444742-gl994l0gjj6toalhm3bijpkklfae607d.apps.googleusercontent.com'
});

const SignIn = () => {
	async function onGoogleButtonPress () {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}

	return (
		<View style={styles.signInContainer}>
			<Text style={styles.signInText}>Sign In with Google</Text>
			<TouchableOpacity
				onPress={() => onGoogleButtonPress().then(() => console.log())}
				style={styles.btnContainer}
			>
				<Text style={styles.btnText}>Google Sign-In</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	signInContainer: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#141414',
	},

	signInText: {
		marginBottom: 30,
		fontSize: 40,
		fontWeight: 'bold',
		color: '#fff'
	},

	btnContainer: {
		elevation: 8,
		backgroundColor: '#7888ff',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 40
	},

	btnText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
	}
});

export default SignIn;
