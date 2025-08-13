import { createContext } from 'react';

export interface AuthContextType {
	isAuth: boolean;
	setIsAuth: (value: boolean) => void;
	isLoading?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	setIsAuth: () => {},
	isLoading: true,
});
