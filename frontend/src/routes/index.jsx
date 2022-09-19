import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Chat from '../pages/chat/Chat';
import Home from '../pages/Home';
import Messenger from '../pages/messenger/MessengerPage';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import SinglePost from '../pages/singlepost/SinglePost';
import { setEditingPost } from '../redux/slices/postSlice';
import Header from '../sharedcomponents/Header';

const Router = () => {
	const {
		modal: { isSidebarVisible },
		post: { editingPost },
	} = useSelector((state) => state);

	const dispatch = useDispatch();

	const closeEditing = () => {
		dispatch(setEditingPost({}));
	};
	return (
		<>
			{/* <div className={isSidebarVisible ? 'sidebar visible' : 'sidebar'}>
				<Online />
			</div>
			<Backdrop show={!!editingPost._id} onClose={closeEditing}>
				<EditPost close={closeEditing} />
			</Backdrop> */}
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/post/:id' element={<SinglePost />} />
				<Route path='/user/:id' element={<Profile />} />
				<Route path='/chat' element={<Chat />} />
				<Route path='/chat/messenger' element={<Messenger />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};

export default Router;
