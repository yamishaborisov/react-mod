const NAME_CHARS = /^[\p{L}\p{M} '’-]+$/u;
const STARTS_WITH_LETTER = /^\p{L}/u;
const ENDS_WITH_LETTER = /\p{L}$/u;
const DOUBLE_SEP = /[ '’-]{2,}/u;

export function isValidName(value: string): boolean {
	const v = value.trim();
	if (v.length < 2 || v.length > 40) return false;
	if (!NAME_CHARS.test(v)) return false;
	if (!STARTS_WITH_LETTER.test(v)) return false;
	if (!ENDS_WITH_LETTER.test(v)) return false;
	if (DOUBLE_SEP.test(v)) return false;
	return true;
}
