import { useEffect, useState, JSX } from 'react';
import styles from './styles.module.css';
import { ButtonCookies } from '@shared/ui/button-cookies';

export const CookieConsent = (): JSX.Element | null => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent');
		if (consent === null) {
			setVisible(true);
		}
	}, []);

	const handleChoice = (choice: 'accepted' | 'declined'): void => {
		localStorage.setItem('cookieConsent', choice);
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className={styles.cookieBanner}>
			<p>
				🍪Мы используем cookies для улучшения работы сайта. <br />
				ла ла ла ла ла ла ла ла ла ла
			</p>
			<div className={styles.gridCookieActions}>
				<ButtonCookies
					onClick={() => handleChoice('accepted')}
					variant='accept'
				>
					Принять
				</ButtonCookies>
				<ButtonCookies
					onClick={() => handleChoice('declined')}
					variant='decline'
				>
					Отклонить
				</ButtonCookies>
			</div>
		</div>
	);
};
