import { ZodError } from 'zod';
import { SendFormPayloadSchema } from '../form-schema';

export async function sendForm(input: unknown) {
	const res = SendFormPayloadSchema.safeParse(input);
	if (!res.success) {
		throw new ZodError(res.error.issues);
	}
	await new Promise(r => setTimeout(r, 3000));
}
