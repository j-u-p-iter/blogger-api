import to from 'await-to-js';
import HTTPStatus from 'http-status';


export const createPostController = ({
  postModel,
  utils: {
    responseWithSuccess,
    responseWithError,
  },
}) => {
  const create = async (req, res) => {
    const postData = req.body;

    postData.author = req.user;

    const [err, post] = await to(postModel.create(postData));

    if (err) {
      return responseWithError({
        res,
        err,
        status: HTTPStatus.BAD_REQUEST,
      });
    }

    return responseWithSuccess({
      res,
      data: { post },
      status: HTTPStatus.CREATED,
      message: 'Create post with success',
    });
  };

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
