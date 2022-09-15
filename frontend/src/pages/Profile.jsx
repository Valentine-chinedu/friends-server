import React from 'react';
import Gallery from '../shared components/Gallery';
import Online from '../shared components/Online';
import Posts from '../shared components/Post';
import ProfileCard from '../shared components/ProfileCard';

const Profile = () => {
	return (
		<div>
			<article>
				<ProfileCard />
				<Gallery />
			</article>
			<article>
				<Posts />
			</article>
			<article>
				<Online />
			</article>
		</div>
	);
};

export default Profile;
