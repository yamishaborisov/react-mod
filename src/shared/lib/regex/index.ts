export const NAME_REGEX =
	/^(?=.{2,40}$)(?!.*[ '’-]{2,})\p{L}(?:[\p{L}\p{M} '’-]*\p{L})$/u;

export const EMAIL_REGEX = /\S+@\S+\.\S+/;
