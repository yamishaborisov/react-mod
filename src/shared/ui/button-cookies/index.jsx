import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

export const ButtonCookies = ({ children, variant, ...props }) => {
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
