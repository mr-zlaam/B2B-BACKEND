export const throwError = (code: number, message: string) => {
  throw {
    code,
    message
  };
};
