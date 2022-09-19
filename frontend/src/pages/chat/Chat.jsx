import React from 'react';
import { useSelector } from 'react-redux';
import Messenger from '../../sharedcomponents/Messenger';
import ChatCard from './components/ChatCard';

const Chat = () => {
	const {
		message: { chats },
	} = useSelector((state) => state);

	return (
		<main>
			<section>
				{chats.map((chat) => (
					<ChatCard chat={chat} key={chat._id} />
				))}
			</section>
			<Messenger />
		</main>
	);
};

export default Chat;
