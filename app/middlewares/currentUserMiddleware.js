import to from 'await-to-js';
import { split } from 'lodash';


export const createCurrentUserMiddleware = ({
  userModel,
  authenticationService,
}) => {
  return async function(req, res, next) {
    const accessToken = split(req.headers.authorization)[1];
    const decodedAccessToken = authenticationService.decodeToken(accessToken);

    if (decodedAccessToken) {
      const { userId } = decodedAccessToken;
      const [err, user] = await to(userModel.readById(userId));

      req.user = user;
    }

    next();
  }
}
