import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type Variant = 'accept' | 'decline';

interface ButtonCookiesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant: Variant;
}

export const ButtonCookies: FC<ButtonCookiesProps> = ({
	children,
	variant,
	...props
}) => {
	return (
		<button
			className={clsx(
				styles.btn,
				variant === 'accept' && styles.btnAccept,
				variant === 'decline' && styles.btnDecline
			)}
			{...props}
		>
			{children}
		</button>
	);
};
