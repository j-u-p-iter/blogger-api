import to from 'await-to-js';
import HTTPStatus from 'http-status';


const createUserController = ({
  userModel,
  utils: {
    responseWithSuccess,
    responseWithError,
  },
}) => {
  const create = async (ctx) => {
    const userData = ctx.request.body;
    const { response: res } = ctx;

    const [err, user] = await to(userModel.create(userData));

    if (err) {
      return responseWithError({
        res,
        err,
        status: HTTPStatus.BAD_REQUEST,
      });
    }

    return responseWithSuccess({
      res,
      data: { user: user.toJSON() },
      status: HTTPStatus.CREATED,
      message: 'Create user with success',
    });
  };

  const readAll = async (ctx) => {
    const { response: res } = ctx;

    const [err, users] = await to(userModel.readAll());

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    return responseWithSuccess({
      res,
      data: { users },
      status: HTTPStatus.OK,
      message: 'Retrieve users with success',
    });
  };

  const update = async (ctx) => {
    const { response: res } = ctx;
    const userDataToUpdate = ctx.request.body;
    const { userId } = ctx.params;

    const [err, user] = await to(userModel.update(userId, userDataToUpdate));

    if (err) {
      return responseWithError({
        res,
        err,
        status: HTTPStatus.BAD_REQUEST,
      });
    }

    return responseWithSuccess({
      res,
      data: { user },
      status: HTTPStatus.OK,
      message: 'Update user with success',
    });
  };

  const deleteOne = async (ctx) => {
    const { response: res } = ctx;
    const { userId } = ctx.params;

    const [err] = await to(userModel.deleteOne(userId));

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    return responseWithSuccess({
      res,
      status: HTTPStatus.OK,
      message: 'User deleted with success',
    });
  };

  return {
    create,
    readAll,
    update,
    deleteOne,
  };
};


export default createUserController;
