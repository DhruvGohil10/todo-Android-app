import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Linking } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { themeContext } from './home';
// import { useColorMode } from 'native-base';



const DropDown = ({ renderSignIn, docId }) => {
	// const { darkTheme, toggleTheme } = useContext(themeContext);
	const [ visible, setVisible ] = useState(false);
	// const { toggleColorMode } = useColorMode();

	const changeName = () => {
		firestore()
			.collection('users')
			.doc(docId)
			.update({
				todoUserName: ''
			})

		setVisible(false);
	};

	// const changeTheme = () => {
	// 	toggleTheme();
	// 	toggleColorMode();

	// 	setVisible(false)
	// }

	const showMenu = () => setVisible(true);

	const hideMenu = () => setVisible(false);

	const signOutMethod = () => {
		auth().signOut().then(() => renderSignIn(null));

		setVisible(false);
	};

	return (
		<View style={styles.hamburgerContainer}>
			<Menu
				visible={visible}
				anchor={
					<Text onPress={showMenu} style={styles.hamburgerImgView}>
						<Image source={require('../assets/hamburger.png')} style={styles.hamburgerImg} />
					</Text>
				}
				onRequestClose={hideMenu}
				animationDuration={0}
				style={styles.menu}
			>
				<MenuItem 
					onPress={() => {
						Linking.openURL('https://www.instagram.com/dhruv.g._/');
						setVisible(false)
					}} 
					textStyle={styles.menuItem}>
					Developer 😎
				</MenuItem>
				<MenuItem onPress={changeName} textStyle={styles.menuItem}>
					Change Name 📛
				</MenuItem>
				{/* <MenuItem onPress={changeTheme} textStyle={styles.menuItem}>
					{darkTheme ? 'Make it Light 🌤️' : 'Make it Dark 🌑'}
				</MenuItem> */}
				<MenuItem onPress={signOutMethod} textStyle={styles.menuItem}>
					Log out 👋
				</MenuItem>
			</Menu>
		</View>
	);
};

const styles = StyleSheet.create({
	hamburgerContainer: {
		position: 'absolute',
		left: 10,
		top: 0
	},

	hamburgerImg: {
		height: 38,
		width: 38
	},

	hamburgerImgView: {
		height: 70,
		width: 41
	},

	menu: {
		height: 155,
		width: 200,
		borderWidth: 2,
		borderColor: '#000'
	},

	menuItem: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'montserrat',
	}
});

export default DropDown;
