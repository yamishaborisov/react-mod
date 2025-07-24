import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from '@post-item/ui/post-item';
import styles from './post-list.module.css';

const PostList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>;
	}

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) => {
					const nodeRef = React.createRef(null);

					return (
						<CSSTransition
							key={post.id}
							timeout={500}
							classNames={styles.post}
							nodeRef={nodeRef}
						>
							<div ref={nodeRef}>
								<PostItem remove={remove} number={index + 1} post={post} />
							</div>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</div>
	);
};

export default PostList;
