exports.throwError = (code, errorMessage) => err => {
  const error = new Error(errorMessage || "Something didn't work quite right!");
  error.code = code;
  if (err.errors) {
    error.message = err.errors.map(e => e.message).join('\n');
  }
  throw error;
}

exports.throwIf = (fn, code, errorMessage) => result => {
  if (fn(result)) {
    return exports.throwError(code, errorMessage)(new Error())
  }
  return result;
}