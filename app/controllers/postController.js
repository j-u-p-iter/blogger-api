import to from 'await-to-js';
import HTTPStatus from 'http-status';


export const createPostController = ({
  postModel,
  utils: {
    responseWithSuccess,
    responseWithError,
  },
}) => {
  const create = () => {};

  const readAll = () => {}; 

  const readOne = () => {};

  const update = () => {};

  const deleteOne = () => {};

  return {
    create,
    readAll,
    readOne,
    update,
    deleteOne,
  };
};
