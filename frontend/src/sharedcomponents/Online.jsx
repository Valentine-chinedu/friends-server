import { dp } from 'frontend/src/assets/dp.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/slices/modalSlice';

const Online = () => {
	const {
		users: { usersOnline, users },
	} = useSelector((state) => state);

	const dispatch = useDispatch();

	const allUsers = () => {
		return users.map((user) => (
			<Link
				to={`/user/${user._id}`}
				key={user._id}
				onClick={() => dispatch(toggleSidebar(false))}
			>
				<div>
					<div>
						<img src={user.profileImage || dp} alt={user.name + ' image'} />
					</div>
					<h3>{user.name}</h3>
				</div>
			</Link>
		));
	};

	const onlineUsers = () => {
		const _usersOnline = users.filter((user) =>
			usersOnline.some((u) => u.id === user._id)
		);
		return _usersOnline.map((user) => (
			<Link
				to={`/user/${user._id}`}
				key={user._id}
				onClick={() => dispatch(toggleSidebar(false))}
			>
				<div title={user.name}>
					<div>
						<img src={user.profileImage || dp} alt={user.name + ' image'} />
					</div>
				</div>
			</Link>
		));
	};

	return (
		<section>
			<h2>Users Online - {usersOnline.length}</h2>
			<div>{onlineUsers()}</div>
			<h2>All Users - {users.length}</h2>
			{allUsers()}
		</section>
	);
};

export default Online;
