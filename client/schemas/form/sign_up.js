import validator from '../../../shared/validators/sign_up';

const SCHEMA = {
  submitButtonText: 'Create!',
  altButtonText: 'Use Guest Account!',
  title: 'Create an Account',
  validator,
  fields: [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'password',
      label: 'Password',
      isPassword: true,
    },
  ],
};

export default SCHEMA;
