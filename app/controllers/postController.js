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

    postData.author = req.user.id;

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
      data: { post: post.toClient() },
      status: HTTPStatus.CREATED,
      message: 'Create post with success',
    });
  };

  const readAll = async (req, res) => {
    const [err, posts] = await to(postModel.readAll());  

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    return responseWithSuccess({
      res,
      data: { posts: posts.map(post => post.toClient()) },
      status: HTTPStatus.OK,
      message: 'Retrieve posts with success',
    });
  }; 

  const readOne = async (req, res) => {
    const { params: { postId } } = req;
    
    const [err, post] = await to(postModel.readById(postId))

    if (err) {
      return responseWithError({
        res,
        err: { message: `No post with id ${postId}` },
        status: HTTPStatus.NOT_FOUND,
      });
    }

    return responseWithSuccess({
      res,
      data: { post: post.toClient() },
      status: HTTPStatus.OK,
      message: 'Retrieve post with success',
    });
  };

  const update = async (req, res) => {
    const { body: postData, params: { postId } } = req;

    const [err, post] = await to(postModel.update(postId, postData));

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    return responseWithSuccess({
      res,
      data: { post: post.toClient() },
      status: HTTPStatus.OK, 
      message: 'Update post with success',
    });
  };

  const deleteOne = () => {};

  return {
    create,
    readAll,
    readOne,
    update,
    deleteOne,
  };
};
