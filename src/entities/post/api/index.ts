import { api } from '@/shared/api';

export const PostService = {
	async getAll(limit = 10, page_number = 1) {
		const response = await api.get('/posts', {
			params: {
				_limit: limit,
				_page: page_number,
			},
		});

		return response;
	},

	async getById(id: number) {
		const response = await api.get(`/posts/${id}`);
		return response;
	},

	async getCommentsByPostId(id: number) {
		const response = await api.get(`/posts/${id}/comments`);
		return response;
	},
};
