import HTTPStatus from 'http-status';


export const createVerifyUserMiddleware = ({
  utils: {
    responseWithError,
  },
}) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return responseWithError({
        res,
        err: { message: 'Accessable only for authenticated users' },
        status: HTTPStatus.FORBIDDEN,
      }); 
    }

    next();
  };
} 
