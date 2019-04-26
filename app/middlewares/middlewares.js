import bodyParser from 'body-parser';

import { createCurrentUserMiddleware } from './currentUserMiddleware'; 

export const createMiddlewares = ({
  userModel,
  authenticationService,
}) => [
  bodyParser.json(),
  createCurrentUserMiddleware({
    userModel,
    authenticationService,
  }),
];
