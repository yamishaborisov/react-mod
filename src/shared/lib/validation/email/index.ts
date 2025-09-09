import { EMAIL_REGEX } from '../../regex';
export const isValidEmail = (email: string) => {
	return EMAIL_REGEX.test(email);
};
