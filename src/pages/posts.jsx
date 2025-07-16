import { useEffect, useRef, useState } from 'react';
import PostService from '../entities/post/api/post-service';
import PostFilter from '../features/post-filter/ui/post-filter';
import PostForm from '../features/post-form/ui/post-form';
import PostList from '../features/post-list/ui/post-list';
import MyButton from '../shared/ui/button/button';
import Loader from '../shared/ui/loader/loader';
import MyModal from '../shared/ui/modal/modal';
import Pagination from '../shared/ui/pagination/pagination';
import MySelect from '../shared/ui/select/select';
import { useFetching } from '../shared/lib/hooks/useFetching';
import { useObserver } from '../shared/lib/hooks/useObserver';
import { usePosts } from '../features/post-filter/model/hooks/usePosts';
import '../shared/styles/App.css';
import { getPagesCount } from '../shared/lib/pagination/pages';

function Posts() {
	const [posts, setPosts] = useState([]);

	const createPost = newPost => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = page => {
		setPage(page);
	};

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const lastElement = useRef();

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page);
			setPosts([...posts, ...response.data]);
			const totalCount = response.headers['x-total-count'];
			setTotalPages(getPagesCount(totalCount, limit));
		}
	);

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page, limit]);

	return (
		<div className='App'>
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Кол-во элементов на странице'
				options={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'Показать все' },
				]}
			/>
			{postError && <h1>Произошла ошибка ${postError}</h1>}

			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title='Список постов 1'
			/>
			<div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
			{isPostsLoading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '50px',
					}}
				>
					<Loader />
				</div>
			)}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			></Pagination>
		</div>
	);
}

export default Posts;
