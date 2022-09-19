import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dp } from '../../assets/dp.jpg';

import useFetch from '../../hooks/useFetch';
import {
	addMessages,
	clearMessage,
	deleteChat,
	updateChats,
} from '../../redux/slices/messageSlice';
import Input from '../../sharedcomponents/Input';
import Options from '../../sharedcomponents/Options';
import SingleChat from '../../sharedcomponents/SingleChat';

const Messenger = () => {
	const {
		user: { id },
		message: { messages, conversationID, to, chats },
		socket: { socket },
		users: { usersOnline },
	} = useSelector((state) => state);

	const userDetails =
		chats?.find((chat) => chat._id === conversationID)?.userDetails || {};

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const scroll = useRef();

	useEffect(() => {
		if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
	}, [messages]);

	const submitHandler = async (message) => {
		socket.emit('send message', message, to, conversationID, id);
		dispatch(addMessages({ text: message, send: true }));
		dispatch(updateChats({ id: to, lastMessage: message, customFetch }));
	};

	const deleteHandler = () => {
		socket.emit('delete chat', conversationID, to);
		dispatch(deleteChat(conversationID));
	};
	const clearHandler = () => {
		socket.emit('clear chat', conversationID, to);
		dispatch(clearMessage({ conversationID }));
	};

	const options = {
		'Delete Chat': deleteHandler,
		'Clear Chat': clearHandler,
	};

	return (
		<section>
			{conversationID ? (
				<>
					<header>
						<img src={userDetails.profileImage || dp} alt='chatIcon' />
						<div>
							<h3>{userDetails.name}</h3>
							{usersOnline.some((u) => u.id === userDetails._id) && (
								<p>Online</p>
							)}
						</div>
						<Options options={options} />
					</header>
					<main ref={scroll}>
						<div>
							{messages.map((message, i, messages) => {
								return (
									<SingleChat
										key={i}
										message={message}
										index={i}
										messages={messages}
									/>
								);
							})}
						</div>
					</main>
					<footer>
						<Input
							placeholder='Type a message...'
							handler={submitHandler}
							showEmoji
						/>
					</footer>
				</>
			) : (
				<h4>Select a conversation</h4>
			)}
		</section>
	);
};

export default Messenger;
