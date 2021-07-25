const validator = require("validator");

module.exports.validateRegisterInput = ({
  username,
  password,
  email,
  confirmedPassword,
}) => {
  const errors = {};
  if (validator.isEmpty(username)) {
    errors.username = "Username is required";
  }
  if (validator.isEmail(password)) {
    errors.password = "Password is required";
  }
  if (!validator.equals(password, confirmedPassword)) {
    errors.confirmedPassword = "Passwords dont match";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }

  return {
    errors,
    isValid: () => Object.keys(errors).length === 0,
  };
};
