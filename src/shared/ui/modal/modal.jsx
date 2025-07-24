import React from 'react';
import clsx from 'clsx';
import styles from './modal.module.css';

const MyModal = ({ children, visible, setVisible }) => {
	return (
		<div
			className={clsx(styles.myModal, { [styles.active]: visible })}
			onClick={() => setVisible(false)}
		>
			<div className={styles.myModalContent} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default MyModal;
