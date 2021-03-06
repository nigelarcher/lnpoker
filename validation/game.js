const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewTableInput(data) {
  let errors = {};

  // if username is empty then convert to empty string
  data.smallBlind = !isEmpty(data.smallBlind) ? data.smallBlind : "";
  data.bigBlind = !isEmpty(data.bigBlind) ? data.bigBlind : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // username min length
  if (!validator.isLength(data.name, { min: 6, max: 30 })) {
    errors.username = "Username must be between 6 and 30 characters long";
  }

  // username has no spaces
  // username only has a-z char
  if (!validator.isAlpha(data.name)) {
    errors.username =
      "Only a-zA-Z characters allowed in username. No spaces either.";
  }

  // username is required
  if (validator.isEmpty(data.name)) {
    errors.username = "Username is required";
  }

  // password has min length
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters long";
  }

  // password is required
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  // password must match
  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "Passwords must match";
  }

  // password 2 is required
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Both passwords are required and must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
