import { useMemo } from 'react';

type post = {
	id?: number;
	title: string;
	body: string;
};

export const useSortedPosts = (
	posts: post[] = [],
	sort?: keyof Pick<post, 'title' | 'body'>
) => {
	const sortedPosts = useMemo(() => {
		if (sort) {
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [sort, posts]);

	return sortedPosts;
};
