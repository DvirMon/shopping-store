const handleError = (err, request, response, next) => {

  if (err.status === 400) {
    return response.status(400).json(err.message);
  }

  if (err.status === 401) {
    return response.status(401).json(err.message);
  }

  if (err.status === 403) {
    return response.status(403).json(err.message);
  }

  if (err.status === 404) {
    return response.status(404).json(err.message);
  }

  if (err.status === 409) {
    return response.status(409).json(err.message);
  }

  if (config.production) {
    return response
      .status(500)
      .send("an error has occurred, please ty again later");
  } else {
    return response.status(500).json(err.message);
  }
};

module.exports = handleError;
