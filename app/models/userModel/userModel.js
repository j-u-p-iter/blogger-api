import createModel from 'models/createModel';


const createUserModel = ({
  userSchema,
}) => createModel('User', userSchema);


export default createUserModel;
