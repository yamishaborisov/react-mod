import { FC, ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './modal.module.css';

interface MyModalProps {
	children: ReactNode;
	visible: boolean;
	setVisible: (value: boolean) => void;
}

const MyModal: FC<MyModalProps> = ({ children, visible, setVisible }) => {
	const handleBackgroundClick = () => setVisible(false);
	const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div
			className={clsx(styles.myModal, { [styles.active]: visible })}
			onClick={handleBackgroundClick}
		>
			<div className={styles.myModalContent} onClick={handleContentClick}>
				{children}
			</div>
		</div>
	);
};

export default MyModal;
