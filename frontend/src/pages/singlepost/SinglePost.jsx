import React, { useEffect } from 'react';

import { useParams } from 'react-router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { setSinglePost } from '../../redux/slices/postSlice';
import { commentPost, fetchPosts } from '../../services/postServices';
import Input from '../../sharedcomponents/Input';
import Online from '../../sharedcomponents/Online';
import Comments from './components/Comments';
import Posts from '../../sharedcomponents/Posts';

const SinglePost = () => {
	const { id } = useParams();
	const { token } = JSON.parse(Cookies.get('user'));
	const { singlePost } = useSelector((state) => state.post);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPosts, { id });
			if (data) dispatch(setSinglePost(data.post));
		})();
	}, [id, token, dispatch, customFetch]);

	const commentHandler = async (comment) => {
		dispatch(commentPost({ customFetch, id: singlePost._id, comment }));
	};

	return (
		<section>
			<div>
				<Posts singlepost={true} post={singlePost} />
				<article>
					<Comments post={singlePost} />
					<Input
						placeholder='Write a comment...'
						handler={commentHandler}
						showEmoji
					/>
				</article>
			</div>
			<article>
				<Online />
			</article>
		</section>
	);
};

export default SinglePost;
