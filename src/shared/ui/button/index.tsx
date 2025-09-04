import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';

export type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const MyButton: FC<MyButtonProps> = ({
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
