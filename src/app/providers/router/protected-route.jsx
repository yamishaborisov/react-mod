import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@auth/context';
import Loader from '@shared-ui/loader/loader';

export const ProtectedRoute = ({ children }) => {
	const { isAuth, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Loader />;
	}

	return isAuth ? children : <Navigate to='/login' replace />;
};
