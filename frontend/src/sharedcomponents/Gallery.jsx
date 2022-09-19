import React from 'react';
import Backdrop from './BackDrop';
import MainGallery from './MainGallery';

const Gallery = () => {
	const {
		userPosts: { posts },
	} = useSelector((state) => state.post);
	const postsWithImages = posts.filter((post) => !!post.image);
	const [isMainGalleryOpen, setIsMainGalleryOpen] = useState(false);

	const hideGallery = () => {
		setIsMainGalleryOpen(false);
	};

	return (
		<section>
			<Backdrop show={isMainGalleryOpen} onClose={hideGallery}>
				<MainGallery posts={postsWithImages} close={hideGallery} />
			</Backdrop>
			<div>
				{postsWithImages.map(
					(v, i) =>
						i < 3 && (
							<Link to={`/post/${v._id}`} key={v._id}>
								<img src={v?.image.src} alt='postimage' />
							</Link>
						)
				)}
			</div>
			{postsWithImages.length > 3 && (
				<button onClick={() => setIsMainGalleryOpen(true)}>View All</button>
			)}
		</section>
	);
};

export default Gallery;
