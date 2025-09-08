import { z } from 'zod';

export const SendFormPayloadSchema = z.object({
	email: z.string().email(),
	name: z.string().trim().min(1),
	city: z.string().trim().min(1).optional(),
});

export type SendFormPayload = z.infer<typeof SendFormPayloadSchema>;
