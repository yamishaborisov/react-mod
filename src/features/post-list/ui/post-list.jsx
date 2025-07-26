import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from '@post-item/ui/post-item';
import styles from './post-list.module.css';
import clsx from 'clsx';

const PostList = ({ posts, title, remove, layout }) => {
	if (!posts.length) {
		return <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>;
	}

	return (
		<div
			className={clsx({
				[styles.postList]: layout === 'flex',
				[styles.postListGrid]: layout === 'grid',
			})}
		>
			<h1
				className={clsx({ [styles.gridHeader]: layout === 'grid' })}
				style={{ textAlign: 'center' }}
			>
				{title}
			</h1>
			<TransitionGroup component={null}>
				{posts.map((post, index) => {
					const nodeRef = React.createRef(null);

					return (
						<CSSTransition key={post.id} timeout={500} nodeRef={nodeRef}>
							<div ref={nodeRef}>
								<PostItem
									remove={remove}
									number={index + 1}
									post={post}
									layout={layout}
								/>
							</div>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</div>
	);
};

export default PostList;
