import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/shared/ui/navbar';
import { CookieConsent } from '@/features';
import '@/shared/styles/App.css';
import '@/shared/styles/variables.css';

import { AuthContext } from '@/shared/lib/contexts';
import { AppRouter } from './providers/router/app-router';

export function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				setIsAuth,
				isLoading,
			}}
		>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
			<CookieConsent />
		</AuthContext.Provider>
	);
}
