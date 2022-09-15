import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import SearchResults from './SearchResults';

const Header = () => {
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState({});

	const dispatch = useDispatch();
	const customFetch = useFetch();

	const searchHandler = async (e) => {
		e.preventDefault();
		if (query.length > 0) {
			dispatch(setIsLoading(true));
			const { posts } = await customFetch(fetchPostsService, { query });
			const { users } = await customFetch(fetchUsersService, { query });
			setSearchResult({ posts, users });
			dispatch(setIsLoading(false));
		}
	};
	return (
		<header>
			<Link to='/'>homeIcon</Link>
			<form>
				<button type='submit' arail-label='search'>
					searchIcon
				</button>
				<input type='text' placeholder='Tap to search' />
				<button type='button' arial-label='clear search'>
					closeIcon
				</button>
				{SearchResults.posts ||
					(SearchResults.user && (
						<SearchResults searchResult={searchResult} reset={reset} />
					))}
			</form>
			<nav>
				<Link to={`/user/{id}`}>
					<img src='' alt='' />
				</Link>

				<Link to='/chat'>
					<img src='' alt='' />
				</Link>
			</nav>
		</header>
	);
};

export default Header;
