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

    const [err, user] = await to(userModel.create(userData0));

    if (error) {
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
        accessToken: authenticationService.createToken(user),
      },
      status: HTTPStatus.CREATED,
      message: 'Sign Up with success',
    });   
  }; 

  const signIn = () => {};

  const resetPassword = () => {};

  const getCurrentUser = () => {};

  return {
    signUp,
    signIn,
    resetPassword,
    getCurrentUser,
  }
};
