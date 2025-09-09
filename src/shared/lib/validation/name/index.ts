import { NAME_REGEX } from '../../regex';

export function isValidName(value: string): boolean {
	return NAME_REGEX.test(value.trim());
}
