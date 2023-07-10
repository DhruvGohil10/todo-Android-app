import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
	IconButton,
	Checkbox,
	Text,
	Box,
	VStack,
	HStack,
	Icon,
	Center,
	Button,
	useColorMode
} from 'native-base';
import { DeleteImg } from './images';
// import { themeContext } from './home';


const Todos = ({ user }) => {
	let [ todos, setTodos ] = useState([]);
	// let [darkThemeValue, setDarkThemeValue] = useState(false);
	// const { toggleColorMode } = useColorMode();
	// const { darkTheme } = useContext(themeContext);

	// useEffect(() => {
	// 	setDarkThemeValue(darkTheme);
	// },[])

	// useEffect(() => {
	// 	if(darkTheme === true){
	// 		toggleColorMode();
	// 	}
	// }, [])

	useEffect(() => {
		const subscriber = firestore()
			.collection('todos')
			.where('uid', '==', user.uid)
			.orderBy("Timestamp", "asc")
			.onSnapshot((querySnapshot) => {
				// console.log(querySnapshot);
					let parssedTodos = [];

					querySnapshot.forEach((doc) => {
						let object = {
							todo: doc.data().todo,
							completed: doc.data().completed,
							todoId: doc.id
						};
	
						parssedTodos.push(object);
					});
					
					setTodos(parssedTodos);

			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, []);

	// const instState = [
	// 	{
	// 		title: 'Code',
	// 		isCompleted: true
	// 	},
	// 	{
	// 		title: 'Meeting with team at 9',
	// 		isCompleted: false
	// 	},
	// 	{
	// 		title: 'Check Emails',
	// 		isCompleted: false
	// 	},
	// 	{
	// 		title: 'Write an article',
	// 		isCompleted: false
	// 	},
	// 	{
	// 		title: 'Write an article, and the quick brownd fox jumped voe the laxy dog',
	// 		isCompleted: false
	// 	}
	// ];
	// const [ list, setList ] = React.useState(instState);

	const handleDelete = (todoId) => firestore().collection('todos').doc(todoId).delete(); //delete doc from firestore

	const toggleCheckBox = (todoId, completed) => {
		//handle the toggle request to firestore of checkbox
		firestore().collection('todos').doc(todoId).update({
			completed: !completed
		});
	};

	return (
		<Center w='100%'>
			<Box w='90%'>
				<VStack space={4}>
					<VStack space={2}>
						<ScrollView>
							{todos.map((t, itemI) => (
								<HStack
									w='100%'
									justifyContent='space-between'
									alignItems='center'
									key={t.title + itemI.toString()}
								>
									<Checkbox
										isChecked={t.completed}
										onChange={() => toggleCheckBox(t.todoId, t.completed)}
										value={t.todo}
										accessibilityLabel='checkbox'
									/>
									<Text
										width='100%'
										flexShrink={1}
										textAlign='left'
										mx='2'
										strikeThrough={t.completed}
										light={{
											color: t.completed ? 'gray.400' : 'coolGray.800'
										}}
										dark={{
											color: t.completed ? 'gray.400' : 'coolGray.50'
										}}
										fontWeight='medium'
										fontSize='md'
										fontFamily='montserrat'
										onPress={() => toggleCheckBox(t.todoId, t.completed)}
									>
										{t.todo}
									</Text>
									<IconButton
										size='sm'
										colorScheme='trueGray'
										icon={
											<Icon as={DeleteImg} name='minus' size='m' color='trueGray.400' />
										}
										onPress={() => handleDelete(t.todoId)}
									/>
								</HStack>
							))}
						</ScrollView>
						{/* <Button onPress={toggleColorMode}>Click Me</Button> */}
					</VStack>
				</VStack>
			</Box>
		</Center>
	);
};

const styles = StyleSheet.create({});

export default Todos;
