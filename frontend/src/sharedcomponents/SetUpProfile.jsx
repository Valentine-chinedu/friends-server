import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { showModal } from '../redux/slices/modalSlice';
import { update } from '../redux/slices/userSlice';
import { getUsers } from '../redux/slices/usersSlice';

const SetupProfile = ({ close, user }) => {
	const [userDetails, setUserDetails] = useState({
		name: '',
		about: '',
		location: '',
	});

	useEffect(() => {
		user._id &&
			setUserDetails({
				name: user.name || '',
				about: user.about || '',
				location: user.location || '',
			});
	}, [user]);

	const _updateUser = (key, e) => {
		setUserDetails((user) => ({
			...user,
			[key]: e.target.value,
		}));
	};

	const dispatch = useDispatch();
	const customFetch = useFetch();

	const clickHandler = async (e) => {
		e.preventDefault();
		const data = await customFetch(updateUserService, userDetails);
		if (data) {
			dispatch(getUsers({ customFetch }));
			close();
			dispatch(update({ name: data.user.name, id: data.user._id }));
			dispatch(showModal({ msg: 'Success' }));
		}
	};

	return (
		<form onSubmit={clickHandler}>
			<label htmlFor=''>Username</label>
			<input
				type='text'
				value={userDetails.name}
				required
				onChange={(e) => _updateUser('name', e)}
			/>
			<label htmlFor=''>About</label>
			<input
				type='text'
				value={userDetails.about}
				onChange={(e) => _updateUser('about', e)}
			/>
			<label htmlFor=''>Location</label>
			<input
				type='text'
				value={userDetails.location}
				onChange={(e) => _updateUser('location', e)}
			/>
			<button type='submit'>Continue</button>
			<button onClick={close} type='reset'>
				Cancel
			</button>
		</form>
	);
};

export default SetupProfile;
