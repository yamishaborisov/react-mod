import type { SendFormPayload } from '../../../types';

export async function sendForm(data: SendFormPayload) {
	await new Promise(r => setTimeout(r, 3000));
	// throw new Error("fail");
}
