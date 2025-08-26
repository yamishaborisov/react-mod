import { api } from '@/shared/api';

export const PostService = {
	getAll(limit = 10, page_number = 1) {
		const response = api.get('/posts', {
			params: {
				_limit: limit,
				_page: page_number,
			},
		});

		return response;
	},

	getById(id: number) {
		const response = api.get(`/posts/${id}`);
		return response;
	},

	getCommentsByPostId(id: number) {
		const response = api.get(`/posts/${id}/comments`);
		return response;
	},
};
