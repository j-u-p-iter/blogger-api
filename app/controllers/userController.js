import to from 'await-to-js';
import HTTPStatus from 'http-status';


const createUserController = ({
  userModel,
  utils: {
    responseWithSuccess,
    responseWithError,
  },
}) => {
  const create = async (req, res) => {
    const userData = req.body;

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
      data: { user: user.toClient() },
      status: HTTPStatus.CREATED,
      message: 'Create user with success',
    });
  };

  const readAll = async (req, res) => {
    const [err, users] = await to(userModel.readAll());

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    return responseWithSuccess({
      res,
      data: { users: users.map(user => user.toClient()) },
      status: HTTPStatus.OK,
      message: 'Retrieve users with success',
    });
  };

  const readOne = async (req, res) => {
    const { userId } = req.params;
    const [err, user] = await to(userModel.readOne(userId));

    if (err) {
      return responseWithError({
        res,
        err,
        status: HTTPStatus.BAD_REQUEST,
      });
    }

    return responseWithSuccess({
      res,
      data: { user: user.toClient() },
      status: HTTPStatus.OK,
      message: 'Retrieve user with success',
    });
  };

  const update = async (req, res) => {
    const userDataToUpdate = req.body;
    const { userId } = req.params;

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
      data: { user: user.toClient() },
      status: HTTPStatus.OK,
      message: 'Update user with success',
    });
  };

  const deleteOne = async (req, res) => {
    const { userId } = req.params;

    const [err] = await to(userModel.deleteOne(userId));

    if (err) {
      return responseWithError({
        res,
        err,
        status: HTTPStatus.BAD_REQUEST,
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
    readOne,
    update,
    deleteOne,
  };
};


export default createUserController;
