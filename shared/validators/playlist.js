const validateName = (name) => {
  const errors = [];

  if (typeof name !== 'string') {
    errors.push('Invalid type.');
  } else if (name.length <= 0) {
    errors.push("Can't be empty.");
  }

  return errors;
};

const validate = ({name}) => {
  const errors = {};

  errors.name = validateName(name);

  return errors;
};

module.exports = validate;
