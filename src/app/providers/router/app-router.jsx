import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '@pages/login';
import Posts from '@pages/Posts';
import Loader from '@shared-ui/loader/loader';
import { AuthContext } from '@auth/context';
import { ProtectedRoute } from './protected-route';
import { routes } from './routes';

export const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Routes>
			{routes.map(({ path, element, private: isPrivate }) => (
				<Route
					key={path}
					path={path}
					element={
						isPrivate ? <ProtectedRoute>{element}</ProtectedRoute> : element
					}
				/>
			))}
			<Route path='*' element={isAuth ? <Posts /> : <Login />} />
		</Routes>
	);
};
