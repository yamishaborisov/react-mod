import classes from './button.module.css';

const MyButton = ({ children, ...props }) => {
	return (
		<button {...props} className={classes.MyBtn}>
			{children}
		</button>
	);
};

export default MyButton;
