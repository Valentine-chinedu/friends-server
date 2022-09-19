import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { setAllPosts } from '../redux/slices/postSlice';
import { fetchPosts } from '../services/postServices';
import CreatePost from '../sharedcomponents/CreatePost';
import InfinityScroll from '../sharedcomponents/InfinityScroll';
import Online from '../sharedcomponents/Online';
import Posts from '../sharedcomponents/Posts';
import ProfileCard from '../sharedcomponents/ProfileCard';

const Home = () => {
	const {
		post: {
			allPosts: { posts, page },
		},
		user: { id },
	} = useSelector((state) => state);

	const customFetch = useFetch();
	const dispatch = useDispatch();

	const getNextPage = async () => {
		const data = await customFetch(fetchPosts, { page: page + 1 });
		dispatch(setAllPosts({ posts: posts.concat(data.posts), page: data.page }));
		return data.posts.length;
	};

	return (
		<section className='home'>
			<div className='home__left'>
				<ProfileCard id={id} isOwnProfile />
			</div>
			<InfinityScroll getNextPage={getNextPage}>
				<main className='home__center'>
					<CreatePost />
					<Posts posts={posts} />
				</main>
			</InfinityScroll>
			<aside className='home__right gradient-border'>
				<Online />
			</aside>
		</section>
	);
};

export default Home;
