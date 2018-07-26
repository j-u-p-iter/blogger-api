import createModel from 'models/createModel';

import userSchema from './userSchema';


const createUserModel = () => createModel('User', userSchema);


export default createUserModel;
