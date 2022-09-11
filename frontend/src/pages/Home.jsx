import CreatePost from '../shared/CreatePost';
import Online from '../shared/Online';
import Profile from '../shared/ProfileCard';

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
