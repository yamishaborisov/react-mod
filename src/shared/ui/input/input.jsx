import classes from './input.module.css';

const MyInput = props => {
	return <input className={classes.MyInput} {...props} />;
};

export default MyInput;
