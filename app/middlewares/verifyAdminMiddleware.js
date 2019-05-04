import HTTPStatus from 'http-status';


export const createVerifyAdminMiddleware = ({
  utils: {
    responseWithError,
  },
}) => {
  return (req, res, next) => {
    const { user: { role: userRole } } = req;

    if (userRole !== 'admin') {
      return responseWithError({
        res,
        err: { message: 'Accessable only admins' },
        status: HTTPStatus.FORBIDDEN,
      }); 
    }

    next();
  };
} 
