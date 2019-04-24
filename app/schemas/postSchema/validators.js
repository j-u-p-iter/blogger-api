import validate from 'mongoose-validator';


export const titleValidator = [
  validate({
    validator: 'isLength',  
    arguments: [5, 220],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters', 
  }),
]

export const bodyValidator = [
  validate({
    validator: 'isMinLength',
    arguments: [100], 
    message: 'Body should contain at least {ARGS[0]} characters',
  });
];
