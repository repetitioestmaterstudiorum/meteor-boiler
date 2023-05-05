export function getErrMsg(e: unknown) {
	return e instanceof Error ? e.message : String(e);
}
