export function deployTx(code: string) {
  return {
    data: code,
    to: undefined,
  };
}
