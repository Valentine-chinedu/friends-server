import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';

import { io } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getUsers } from './redux/slices/usersSlice';
import { setPosts } from './redux/slices/postSlice';
import { setSocket } from './redux/slices/socketSlice';
import Auth from './pages/auth/Auth';
import Router from './routes';
import { Container } from 'react-bootstrap';

function App() {
	const dispatch = useDispatch();
	const customFetch = useFetch();

	const {
		user: { id },
		modal: { isLoading },
		socket: { socket },
		message: { to, conversationID },
	} = useSelector((state) => state);

	useEffect(() => {
		const user = Cookies.get('user');
		user && dispatch(login(JSON.parse(user)));
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			const query = `id=${id}`;
			dispatch(getUsers({ customFetch }));
			dispatch(setPosts({ customFetch }));
			dispatch(setSocket(io(SERVER_URI, { query })));
		}
	}, [id, customFetch, dispatch]);

	//socket events
	useEffect(() => {
		if (socket) {
			socket.on('usersOnline', (users) => dispatch(addOnline(users)));
			socket.on('delete chat', (id) => dispatch(deleteChat(id)));
		}
	}, [socket, dispatch]);

	useEffect(() => {
		if (socket) {
			socket
				.off('receive message')
				.on('receive message', (message, senderID) => {
					dispatch(showModal({ msg: '1 new message' }));
					dispatch(
						updateChats({ lastMessage: message, id: senderID, customFetch })
					);
					senderID === to && dispatch(addMessages({ text: message }));
				});
			socket
				.off('clear chat')
				.on('clear chat', (id) =>
					dispatch(clearMessage({ conversationID: id }))
				);
		}
	}, [customFetch, dispatch, socket, to, conversationID]);

	return (
		<div>
			<div>
				<Modal />
				{id ? <Router /> : <Auth />}
			</div>
			{/* <Backdrop show={isLoading}>
				<Loading />
			</Backdrop> */}
		</div>
	);
}

export default App;
