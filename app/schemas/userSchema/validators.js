import validate from 'mongoose-validator';


const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Name should contain alpha-numeric characters only',
  }),
];

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email should have valid format',
  }),
];

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
];

const roleValidator = [
  validate({
    validator: 'isIn',
    arguments: [['user', 'admin']],
    message: 'Allowed role values: {ARGS[0]}',
  }),
];


export {
  nameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
};
