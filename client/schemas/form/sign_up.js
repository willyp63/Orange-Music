import validator from '../../../shared/validators/sign_up';

const SCHEMA = {
  submitButtonText: 'Sign Up!',
  validator,
  fields: [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'password',
      label: 'Password',
    },
  ],
};

export default SCHEMA;
