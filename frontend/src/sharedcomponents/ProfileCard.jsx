import React, { useState } from 'react';
import { dp } from 'frontend/src/assets/dp.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import getDateString from '../utils/getDateString';
import { setIsLoading } from '../redux/slices/modalSlice';
import { createChat } from '../services/chatServices';
import BackDrop from './BackDrop';
import ImageUpLoad from './ImageUpLoad';
import { logout } from '../redux/slices/userSlice';
import SetUpProfile from './SetUpProfile';

const ProfileCard = ({ id, isOwnProfile }) => {
	const {
		users: { users },
	} = useSelector((state) => state);
	const user = users.find((user) => user._id === id) || {};
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { name, email, about, dob, location, createdAt, profileImage } = user;
	createdAt = `Joined on ${getDateString(createdAt)}`;
	dob = getDateString(dob);

	const sendMessage = async () => {
		dispatch(setIsLoading(true));
		dispatch(createChat({ customFetch, id })).then(() => {
			if (window.innerWidth < 801) navigate('/chat/messenger');
			else navigate('/chat');
			dispatch(setIsLoading(false));
		});
	};

	const hideUploading = () => {
		setIsUploading(false);
	};
	const hideEditing = () => {
		setIsEditing(false);
	};

	return (
		<section>
			{isOwnProfile && (
				<>
					<BackDrop show={isEditing} onClose={hideEditing}>
						<SetUpProfile close={hideEditing} user={user} />
					</BackDrop>
					<BackDrop show={isUploading} onClose={hideUploading}>
						<ImageUpLoad close={hideUploading} />
					</BackDrop>
				</>
			)}
			<header>
				<div>
					<img src={profileImage || dp} alt='profile_image' />
					{isOwnProfile && (
						<div>
							{/* <img src={cameraIcon} alt="change_profile_image" onClick={() => setIsUploading(true)} /> */}
							cameraIcon
						</div>
					)}
				</div>
				<h1>{name || 'User'}</h1>
				<h2>{about || 'About'}</h2>
			</header>
			<article>
				<div>
					{/* <img src={clockIcon} alt='join date' /> */}
					clockIcon
					<h3>{createdAt}</h3>
				</div>
				<div>
					{/* <img src={locationIcon} alt='location' /> */}
					locationIcon
					<h3>{location}</h3>
				</div>
				<div>
					{/* <img src={mailIcon} alt='mail' /> */}
					mailICon
					<h3>{email}</h3>
				</div>
				<div>
					{/* <img src={cakeIcon} alt='date of birth' /> */}
					<h3>{dob}</h3>
				</div>
			</article>
			{isOwnProfile ? (
				<div>
					<button onClick={() => dispatch(logout())}>Logout</button>
					<button onClick={() => setIsEditing(true)}>Edit Profile</button>
				</div>
			) : (
				<div>
					<button onClick={sendMessage}>Message</button>
					<button disabled>Add Friend</button>
				</div>
			)}
		</section>
	);
};

export default ProfileCard;
