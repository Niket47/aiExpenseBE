
const successResponse = (res, message, data, status = 200) => {
  // let message = getMessage(messageCode);
  // let message = messageCode;
  return res.status(status).json({
    status: true,
    message,
    ...(data && { data }),
  });
};

const errorResponse = (res, message, error, status = 400) => {
  // let message = getMessage(messageCode);
  // let message = messageCode;
  return res.status(status).json({
    status: false,
    message,
    ...(error && { error: error.message ? error.message : error }),
  });
};

export { successResponse, errorResponse };
