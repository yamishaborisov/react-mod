import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@router/app-router';
import { Navbar } from '@shared-ui/navbar/navbar';
import { AuthContext } from '@auth/context';
import '@shared-styles/App.css';

function App() {
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
		</AuthContext.Provider>
	);
}

export default App;
