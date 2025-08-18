import { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyInput = (props: MyInputProps) => {
	return <input className={styles.MyInput} {...props} />;
};

export default MyInput;
