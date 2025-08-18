import { useState, MouseEvent, JSX } from 'react';
import MyInput from '@/shared/ui/input';
import MyButton from '@/shared/ui/button';

type post = {
	id?: number;
	title: string;
	body: string;
};

type postFormProps = {
	create: (post: post) => void;
};

const PostForm = ({ create }: postFormProps) => {
	const [post, setPost] = useState<post>({ title: '', body: '' });

	const addNewPost = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const newPost = {
			...post,
			id: Date.now(),
		};
		create(newPost);
		setPost({ title: '', body: '' });
	};
	return (
		<form>
			<MyInput
				value={post.title}
				onChange={e => setPost({ ...post, title: e.target.value })}
				type='text'
				placeholder='Название поста'
			/>
			<MyInput
				value={post.body}
				onChange={e => setPost({ ...post, body: e.target.value })}
				type='text'
				placeholder='Описание поста'
			/>
			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>
	);
};

export default PostForm;
