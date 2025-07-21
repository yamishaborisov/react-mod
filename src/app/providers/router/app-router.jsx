import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Posts from '../../../pages/Posts';
import { Login } from '../../../pages/login';
import Loader from '../../../shared/ui/loader/loader';
import { AuthContext } from '../auth/context';
import { publicRoutes, privateRoutes } from './routes';

export const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Routes>
			{(isAuth ? privateRoutes : publicRoutes).map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={React.createElement(route.component)}
				/>
			))}
			<Route path='*' element={isAuth ? <Posts /> : <Login />} />
		</Routes>
	);
};
