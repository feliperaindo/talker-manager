function midErrorHandler(error, _request, response, _next) {
  return response.status(error.cause).send({ message: error.message });
}

module.exports = midErrorHandler;