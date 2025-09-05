import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

export type MyInputProps = InputHTMLAttributes<HTMLInputElement>;

export const MyInput = (props: MyInputProps) => {
	return <input className={styles.MyInput} {...props} />;
};
