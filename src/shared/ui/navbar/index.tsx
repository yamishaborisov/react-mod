import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@app/providers/auth';
import MyButton from '../button';
import styles from './styles.module.css';

export const Navbar = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');
	};
	return (
		<div className={styles.navbar}>
			<MyButton onClick={logout}>Выйти</MyButton>
			<div className={styles['navbar-links']}>
				<Link to='/about'>О сайте</Link>
				<Link to='/posts'>Посты</Link>
			</div>
		</div>
	);
};
