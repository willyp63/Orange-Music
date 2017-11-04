const validateName = (name) => {
  const errors = [];

  if (typeof name !== 'string') {
    errors.push('Invalid type.');
  } else if (name.length <= 0) {
    errors.push("Can't be empty.");
  }

  return errors;
};

const validatePassword = (password) => {
  const errors = [];

  if (typeof password !== 'string') {
    errors.push('Invalid type.');
  } else if (password.length < 6) {
    errors.push("Must be at least 6 characters.");
  }

  return errors;
};

const validate = ({name, password}) => {
  const errors = {};

  errors.name = validateName(name);
  errors.password = validatePassword(password);

  return errors;
};

module.exports = validate;
