import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const MyButton: FC<MyButtonProps> = ({
	children,
	type = 'button',
	...props
}) => {
	return (
		<button type={type} className={styles.MyBtn} {...props}>
			{children}
		</button>
	);
};

export default MyButton;
