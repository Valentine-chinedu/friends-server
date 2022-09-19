import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dp } from 'frontend/src/assets/dp.jpg';

import { Link } from 'react-router-dom';

import Options from '../Options/Options';
import { commentPost, deletePost, likePost } from '../services/postServices';
import { setEditingPost } from '../redux/slices/postSlice';
import Input from './Input';
import useFetch from '../hooks/useFetch';
import getDateString from '../utils/getDateString';

const Posts = ({ singlepost, post }) => {
	const createdAt = getDateString(post.createdAt);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	//global states
	const {
		user: { id },
		users: { usersOnline },
	} = useSelector((state) => state);
	const isOwnPost = id === post.createdBy;
	const isLiked = post.likes?.includes(id);
	const isOnline = usersOnline.some((user) => user.id === post.createdBy);

	const likeHandler = () => {
		dispatch(likePost({ customFetch, id: post._id, isLiked }));
	};

	const commentHandler = (comment) => {
		dispatch(commentPost({ customFetch, id: post._id, comment }));
	};

	const deleteHandler = () => {
		dispatch(deletePost({ customFetch, id: post._id }));
	};

	const editHandler = () => {
		dispatch(setEditingPost(post));
	};

	const options = {
		Delete: deleteHandler,
		Edit: editHandler,
	};

	const getParagraphs = (text) => {
		const paragraphArray = text.split(/[\n\r]/g);
		return paragraphArray.map((para, i) => para && <p key={i}>{para}</p>);
	};

	const getNumberOfLikes = () => {
		if (post.likes?.length) {
			return post.likes?.includes(id)
				? post.likes?.length - 1 === 0
					? 'You'
					: post.likes?.length - 1 === 1
					? 'You and 1 more'
					: `You and ${post.likes.length - 1} others`
				: post.likes?.length;
		}
		return false;
	};

	const postDetails = () => {
		return (
			<>
				{post.caption && getParagraphs(post.caption)}
				{post.image?.src && <img src={post.image?.src} alt='post_image' />}
			</>
		);
	};

	return (
		<article>
			<header>
				<Link
					to={`/user/${post.createdBy}`}
					className={isOnline ? 'green' : ''}
				>
					<img src={post.userDetails?.image || dp} alt='profileImage' />
				</Link>
				<div>
					<h3>{post.userDetails?.name}</h3>
					<p>{createdAt}</p>
				</div>
				{isOwnPost && <Options options={options} />}
			</header>
			<div>
				{singlepost ? (
					postDetails()
				) : (
					<Link to={`/post/${post._id}`}>{postDetails()}</Link>
				)}
			</div>
			<div>
				<div>
					<img
						src={isLiked ? likeIcon : likeOutlined}
						alt='like'
						onClick={likeHandler}
					/>
					<p>{getNumberOfLikes() || ''}</p>
				</div>
				{singlepost || (
					<Input placeholder={'Write a comment...'} handler={commentHandler} />
				)}
			</div>
		</article>
	);
};

export default Posts;
