import { useEffect, useRef, useState, JSX } from 'react';
import PostService from '@api/index';
import PostFilter from '@post-filter/ui';
import PostForm from '@post-form/ui';
import PostList from '@post-list/ui';
import MyButton from '@shared-ui/button';
import Loader from '@shared-ui/loader';
import MyModal from '@shared-ui/modal';
import Pagination from '@shared-ui/pagination';
import MySelect from '@shared-ui/select';
import { useFetching } from '@shared-hooks/useFetching';
import { useNavigate } from 'react-router-dom';
import { useObserver } from '@shared-hooks/useObserver';
import { usePosts } from '@post-filter/model/hooks/usePosts';
import '@shared-styles/App.css';
import { getPagesCount } from '@shared-pagination/index';

type post = {
	id?: number;
	title: string;
	body: string;
};
type SortField = 'title' | 'body' | '';
type filter = {
	sort: SortField;
	query: string;
};

function Posts(): JSX.Element {
	const [posts, setPosts] = useState<post[]>([]);

	const createPost = (newPost: post) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post: post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	};

	const changePage = (page: number) => {
		setPage(page);
	};

	const [filter, setFilter] = useState<filter>({ sort: '', query: '' });
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [limit, setLimit] = useState<number | string>(10);
	const [page, setPage] = useState<number>(1);
	const lastElement = useRef<HTMLDivElement | null>(null);

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit: number, page: number) => {
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
		if (typeof fetchPosts === 'function') {
			fetchPosts(limit, page);
		}
	}, [page, limit]);

	const [layout, setLayout] = useState<'flex' | 'grid'>('flex');
	const navigate = useNavigate();
	const toDraw = () => {
		navigate('/canvas');
	};

	return (
		<div className='App'>
			<div>
				<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
					Создать пост
				</MyButton>
				<MyButton style={{ marginTop: '30px' }} onClick={toDraw}>
					Порисовать
				</MyButton>
			</div>

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
			<div>
				<MyButton onClick={() => setLayout('flex')}>FLEX</MyButton>
				<MyButton onClick={() => setLayout('grid')}>GRID</MyButton>
			</div>

			{postError && <h1>Произошла ошибка ${postError}</h1>}

			{/* {layout === 'flex' ? (
				<PostList
					posts={sortedAndSearchedPosts}
					remove={removePost}
					title='Список постов на флексах'
				/>
			) : (
				<PostListGrid
					posts={sortedAndSearchedPosts}
					remove={removePost}
					title='Список постов на гридах'
				/>
			)} */}

			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title={layout === 'flex' ? 'Список на флексе' : 'Список на гридах'}
				layout={layout}
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
