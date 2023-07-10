/**
 * @format
 * @flow strict-local
 */
//components
import SignIn from './components/signIn';
import {Home} from './components/home';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { NativeBaseProvider, extendTheme } from 'native-base';


function App () {
	const [ user, setUser ] = useState(null);
	const [docId, setDocId] = useState('');

	const config = {
		useSystemColorMode: false,
		initialColorMode: 'dark'
	};
	const customTheme = extendTheme({ config });

	useEffect(() => {
		const unSubscribe = auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				const uid = user.uid;

				firestore().collection('users').where('uid', '==', uid).get().then((querySnapshot) => {
					if (!querySnapshot._docs.length) {
						// if ther's no doc, add it
						firestore()
							.collection('users')
							.add({
								uid: uid,
								todoUserName: '',
								darkTheme: false,
								existingUserName: user.displayName,
								email: user.email,
								phoneNumber: user.phoneNumber,
								photoUrl: user.photoURL
							})
							.then((doc) => {
								setDocId(doc.id);
							});
					}

					querySnapshot.forEach((doc) => setDocId(doc.id))
				});
			}
		});

		return unSubscribe; //unsubscribe on unmount
	}, []);

	const renderSignIn = value => setUser(value);

	return (
		<View style={styles.appContainer}>
			<NativeBaseProvider theme={customTheme}>
				{!user ? <SignIn /> : (
					!docId == '' && <Home user={user} docId={docId} renderSignIn={renderSignIn}/>
				)}
			</NativeBaseProvider>
		</View>
	)
}

const styles = StyleSheet.create({
	appContainer: {
		width: '100%',
		height: '100%'
	}
});

export default App;
