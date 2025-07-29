import { useContext, JSX, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '@shared-ui/button/button';
import MyInput from '@shared-ui/input/input';
import { AuthContext } from '@auth/context';

export const Login = (): JSX.Element => {
	const { setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const login = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true');
		navigate('/posts');
	};

	return (
		<div>
			<h1>Страница для логина</h1>
			<form onSubmit={login}>
				<MyInput type='text' placeholder='Введите логин' />
				<MyInput type='password' placeholder='Введите пароль' />
				<MyButton type='submit'>Войти</MyButton>
			</form>
		</div>
	);
};
