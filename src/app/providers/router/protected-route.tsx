import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@auth/context';
import Loader from '@shared-ui/loader/loader';

type ProtectedRouteProps = {
	children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}

	return isAuth ? children : <Navigate to='/login' replace />;
};
