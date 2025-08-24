import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MyInput = (props: MyInputProps) => {
	return <input className={styles.MyInput} {...props} />;
};
