import React from 'react';
import { Image, StyleSheet } from 'react-native';
// import { themeContext } from './home';

const DeleteImg = () => {
	// const { darkTheme } = useContext(themeContext);

	// return darkTheme ? (
	// 	<Image source={require('../assets/deleteWhite2.png')} style={styles.deleteImg} />
	// ) : (
	// 	<Image source={require('../assets/delete.png')} style={styles.deleteImg} />
	// );

	return (
		<Image source={require('../assets/deleteWhite2.png')} style={styles.deleteImg} />
	)
};

const styles = StyleSheet.create({
	deleteImg: {
		height: 30,
		width: 30
	}
});

export { DeleteImg };
