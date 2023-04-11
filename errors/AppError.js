module.exports = function AppError(message, httpStatus) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.statusCode = httpStatus;
};
