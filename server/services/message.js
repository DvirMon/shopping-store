const getMessage = (errors) => {

  
  if (errors) { 
    const error = errors.details.map((error) => errorFormat(error));
    return error[0]
  }
  return null
};

const errorFormat = (error) => {
  error.path = error.context.key;
  error.value = error.context.value;
  delete error.context;
  return formatMessage(error);
};

const formatMessage = (error) => {
  if (error.type === "any.required"  || error.type === "string.empty") {
    error.message = error.path + " is required";
  }
  if (error.type === "string.pattern.base"  && error.path === "email") {
    error.message = "invalid email format";
  }
  if (error.type === "string.pattern.base"  && error.path === "contact") {
    error.message = "invalid  format of email or phone";
  }
  if (error.type === "date.isoDate") {
    error.message = "invalid date format";
  }
  if (error.type === "any.allowOnly") {
    error.message = "passwords do not match";
  }
  if (error.type === "any.only" && error.path === "confirmPassword") {
    error.message = "passwords do not match";
  }
  return error;
};

module.exports = { getMessage }