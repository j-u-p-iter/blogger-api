import createModel from 'models/createModel';


export const createUserModel = ({
  userSchema,
}) => createModel('User', userSchema);
