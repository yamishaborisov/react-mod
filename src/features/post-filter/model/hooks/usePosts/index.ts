import { useMemo } from 'react';
import { useSortedPosts } from '@/shared/lib/hooks';

type Post = {
	id?: number;
	title: string;
	body: string;
};
type SortField = 'title' | 'body' | '';

export const usePosts = (
	posts: Post[],
	sort: SortField,
	query: string
): Post[] => {
	const sortValue = sort === '' ? undefined : sort;
	const sortedPosts = useSortedPosts(posts, sortValue);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, sortedPosts]);

	return sortedAndSearchedPosts;
};
