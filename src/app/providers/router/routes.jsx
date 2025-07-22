import { About } from '@pages/about';
import { Login } from '@pages/login';
import { PostIdPage } from '@pages/post-id-page';
import Posts from '@pages/Posts';

export const routes = [
	{ path: '/login', element: <Login />, private: false },
	{ path: '/about', element: <About />, private: false },
	{ path: '/posts', element: <Posts />, private: true },
	{ path: '/posts/:id', element: <PostIdPage />, private: true },
];
