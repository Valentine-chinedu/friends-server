import React from 'react';
import Messenger from '../messenger/Messenger';
import ChatCard from './components/ChatCard';

const Chat = () => {
	return (
		<main>
			<section>
				<ChatCard />
			</section>
			<Messenger />
		</main>
	);
};

export default Chat;
