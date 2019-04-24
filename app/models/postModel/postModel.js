import createModel from 'models/createModel';


export const createPostModel = ({
  postSchema,
}) => createModel('User', postSchema);
