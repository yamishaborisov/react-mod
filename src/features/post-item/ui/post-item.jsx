import { useNavigate } from 'react-router-dom';
import MyButton from '@shared-ui/button/button';
import styles from './post-item.module.css';
import clsx from 'clsx';

const PostItem = props => {
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

export default PostItem;
