import { useEffect, useState, JSX } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '@api/post-service';
import Loader from '@shared-ui/loader/loader';
import { useFetching } from '@shared-hooks/useFetching';

type post = {
	id?: number;
	title: string;
	body: string;
};

type comment = {
	id: number;
	email: string;
	body: string;
};

export const PostIdPage = (): JSX.Element => {
	const params = useParams();
	const [post, setPost] = useState<post>({
		id: 0,
		title: '',
		body: '',
	});
	const [comments, setComments] = useState<comment[]>([]);
	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});

	const [fetchComments, isComLoading, comError] = useFetching(async id => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		if (params.id) {
			if (typeof fetchPostById === 'function') {
				fetchPostById(params.id);
			}
			if (typeof fetchComments === 'function') {
				fetchComments(params.id);
			}
		}
	}, [params.id]);
	return (
		<div>
			<h1>Вы открыли страницу поста c ID = {params.id}</h1>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{post.id}. {post.title}
				</div>
			)}
			<h1>Комментарии</h1>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(comm => {
						return (
							<div key={comm.id} style={{ marginTop: 15 }}>
								<h5>{comm.email}</h5>
								<div>{comm.body}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
