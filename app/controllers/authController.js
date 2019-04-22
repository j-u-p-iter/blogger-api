import HTTPStatus from 'http-status';
import to from 'await-to-js';

export const createAuthController = ({
  userModel,
  authenticationService,
  utils: {
    responseWithError,
    responseWithSuccess,
  },
}) => {
  const signUp = async (req, res) => {
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
      data: { 
        user: user.toClient(), 
        accessToken: authenticationService.generateToken({ id: user._id, role: user.role }),
      },
      status: HTTPStatus.CREATED,
      message: 'Sign Up with success',
    });   
  }; 

  const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return responseWithError({
        res,
        err: { message: 'Email is required' },
        status: HTTPStatus.UNAUTHORIZED,
      });
    }

    if (!password) {
      return responseWithError({
        res,
        err: { message: 'Password is required' },
        status: HTTPStatus.UNAUTHORIZED,
      });
    }

    let [err, user] = await to(userModel.readOne({ email }));

    if (err) {
      return responseWithError({
        res,
        err,
      });
    }

    if (!user) {
      return responseWithError({
        res,
        err: { message: 'No such user' },
        status: HTTPStatus.UNAUTHORIZED,
      });
    }

    // It's enought to check the presence of error
    // If no error, then password is correct
    [err] = await to(authenticationService.checkPassword(password, user.password));

    if (err) {
      responseWithError({
        res,
        err,
        status: HTTPStatus.UNAUTHORIZED,
      });
    }

    return responseWithSuccess({
      res,
      data: {
        user: user.toClient(),
        accessToken: authenticationService.generateToken(),
      },
      status: HTTPStatus.OK,
      message: 'Sign In with success',
    });
  };

  const resetPassword = () => {};

  const getCurrentUser = () => {};

  return {
    signUp,
    signIn,
    resetPassword,
    getCurrentUser,
  }
};
