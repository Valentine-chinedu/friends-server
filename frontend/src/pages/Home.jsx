import CreatePost from '../shared components/CreatePost';
import Online from '../shared components/Online';
import Profile from '../shared components/ProfileCard';

const Home = () => {
	return (
		<section>
			<div>
				<Profile />
			</div>
			<main>
				<CreatePost />
				<Post />
			</main>
			<aside>
				<Online />
			</aside>
		</section>
	);
};

export default Home;
