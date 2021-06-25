const handleError = (err, request, response, next) => {

  if (process.env.NODE_ENV === "production") {
    return response
      .status(500)
      .send("An error has occurred, please ty again later");
  }
 
  if (err.status) {
    return response.status(err.status).json(err.message);
  }

  const error = formatErrorMessage(err)

  // handle unique error
  if (error.type === "mongoose-unique-validator") {
    return response.status(409).json(error);
  }

  // handle schema error
  if (err.name === "ValidationError") {
    return response.status(404).json(formatErrorMessage(err));
  }


  return response.status(500).json(err.message);
};

const formatErrorMessage = (err) => {
  const arr = err.message.split(":");
  if (err.errors) {
    const error = err.errors[arr[1].trim()];
    if (error["properties"]) {
      return error.properties;
    } else if (error.name === "CastError") {
      return error.message;
    }
  }
  return err
};

module.exports = handleError;
