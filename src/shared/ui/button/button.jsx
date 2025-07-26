import classes from './button.module.css';

const MyButton = ({ children, type = 'button', ...props }) => {
	return (
		<button type={type} className={classes.MyBtn} {...props}>
			{children}
		</button>
	);
};

export default MyButton;
