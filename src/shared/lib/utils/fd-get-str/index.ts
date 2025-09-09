export function fdGetStr(fd: string): string | undefined {
	const trimmed = fd.trim();
	return trimmed === '' ? undefined : trimmed;
}
