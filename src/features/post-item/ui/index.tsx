import { useNavigate } from 'react-router-dom';
import { MyButton } from '@/shared/ui/button';
import styles from './styles.module.css';
import clsx from 'clsx';
import { JSX } from 'react';

type post = {
	id?: number;
	title: string;
	body: string;
};

type postItemProps = {
	id?: number;
	title?: string;
	layout: 'flex' | 'grid';
	body?: string;
	post: post;
	remove: (post: post) => void;
	number: number;
};

export const PostItem = (props: postItemProps): JSX.Element => {
	const navigate = useNavigate();
	const openPost = () => {
		navigate(`/posts/${props.post.id}`);
	};
	return (
		<div
			className={clsx({
				[styles.post]: props.layout === 'flex',
				[styles.postItemGrid]: props.layout === 'grid',
			})}
		>
			<div>
				<strong>
					{props.post.id}. {props.post.title}
				</strong>
				<div>{props.post.body}</div>
			</div>
			<div className={styles.post_btns}>
				<MyButton onClick={() => openPost()}>Открыть</MyButton>
				<MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
			</div>
		</div>
	);
};
