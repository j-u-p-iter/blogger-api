import createModel from 'models/createModel';


export const createPostModel = ({
  postSchema,
}) => createModel('Post', postSchema);
