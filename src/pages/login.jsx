import { useContext } from 'react';
import MyButton from '../shared/ui/button/button';
import MyInput from '../shared/ui/input/input';
import { AuthContext } from '../app/providers/auth/context';

export const Login = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);

	const login = event => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true');
	};

	return (
		<div>
			<h1>Страница для логина</h1>
			<form onSubmit={login}>
				<MyInput type='text' placeholder='Введите логин' />
				<MyInput type='password' placeholder='Введите пароль' />
				<MyButton>Войти</MyButton>
			</form>
		</div>
	);
};
