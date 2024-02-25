/**
 * custom error handler
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const errorHandler = (error, req, res, next) => {
  const errorCode = res.statusCode ? res.statusCode : 500;

  res.status(errorCode).json({ message: error.message });
};
