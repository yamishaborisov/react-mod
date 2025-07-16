import { useNavigate } from 'react-router-dom';
import MyButton from '../../../shared/ui/button/button';

const PostItem = props => {
	const navigate = useNavigate();
	const openPost = () => {
		navigate(`/posts/${props.post.id}`);
	};
	return (
		<div className='post'>
			<div className='post-content'>
				<strong>
					{props.post.id}. {props.post.title}
				</strong>
				<div>{props.post.body}</div>
			</div>
			<div className='post-btns'>
				<MyButton onClick={() => openPost()}>Открыть</MyButton>
				<MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
			</div>
		</div>
	);
};

export default PostItem;
