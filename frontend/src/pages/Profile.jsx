import React from 'react';
import Gallery from '../shared/Gallery';
import Online from '../shared/Online';
import Posts from '../shared/Post';
import ProfileCard from '../shared/ProfileCard';

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
