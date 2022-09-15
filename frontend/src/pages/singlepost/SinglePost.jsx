import Online from '../../shared components/Online';
import Post from '../../shared components/Post';
import Comments from './components/Comments';
import Input from './components/Input';

const SinglePost = () => {
	return (
		<section>
			<div>
				<Post />
				<article>
					<Comments />
					<Input />
				</article>
			</div>
			<article>
				<Online />
			</article>
		</section>
	);
};

export default SinglePost;
