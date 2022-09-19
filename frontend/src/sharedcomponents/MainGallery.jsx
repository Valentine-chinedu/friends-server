import { Link } from 'react-router-dom';

const MainGallery = ({ posts, close }) => {
	return (
		<div>
			<button onClick={close} aria-label='close'>
				closeIcon
			</button>
			{posts.map((post) => (
				<Link to={`/post/${post._id}`} key={post._id}>
					<img src={post.image.src} alt='post-images' />
				</Link>
			))}
		</div>
	);
};

export default MainGallery;
