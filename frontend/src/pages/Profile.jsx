import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { setUserPosts } from '../redux/slices/postSlice';
import { fetchPosts } from '../services/postServices';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../sharedcomponents/Gallery';
import InfinityScroll from '../sharedcomponents/InfinityScroll';
import Online from '../sharedcomponents/Online';
import Posts from '../sharedcomponents/Posts';
import ProfileCard from '../sharedcomponents/ProfileCard';
import CreatePost from '../sharedcomponents/CreatePost';

const Profile = () => {
	const { id } = useParams();
	const {
		userPosts: { posts, page },
	} = useSelector((state) => state.post);
	const isOwnProfile = id === useSelector((state) => state.user.id);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPosts, { userId: id });
			if (data) dispatch(setUserPosts(data));
		})();
	}, [dispatch, id, customFetch]);

	const getNextPage = async () => {
		const data = await customFetch(fetchPostsService, {
			userId: id,
			page: page + 1,
		});
		dispatch(
			setUserPosts({ posts: posts.concat(data.posts), page: data.page })
		);
		return data.posts.length;
	};

	return (
		<section>
			<article>
				<ProfileCard id={id} isOwnProfile={isOwnProfile} />
				<Gallery />
			</article>
			<InfinityScroll getNextPage={getNextPage}>
				<article>
					{isOwnProfile && <CreatePost />}
					{posts.length < 1 && <h2>No Posts</h2>}
					<Posts posts={posts} />
				</article>
			</InfinityScroll>
			<article>
				<Online />
			</article>
		</section>
	);
};

export default Profile;
