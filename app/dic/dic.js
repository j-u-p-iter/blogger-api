// Dependency Injection Container.
// Cause DI pattern rocks.
// (This is the only place where hardcoded dependencies should be located)

import express, { Router } from 'express';
import {
  createContainer,
  asFunction,
  asValue,
} from 'awilix';

import createConfigs from 'configs';
import createHTTPServer from 'httpServer';
import {
  createUserModel,
} from 'models';
import {
  createUserController,
} from 'controllers';
import createRoutes, {
  createUsersRoutes,
  createPostsRoutes,
  createCommentsRoutes,
  createAuthRoutes,
} from 'routes';
import {
  createMongooseDBProvider,
} from 'dbProviders';
import {
  createCacheService,
} from 'services';

import createMiddlewares from 'middlewares';
import * as utils from 'utils';


const app = express();
const apiRouter = new Router();
const diContainer = createContainer();

diContainer.register({
  configs: asFunction(createConfigs),

  app: asValue(app),

  httpServer: asFunction(createHTTPServer),

  // it should work like asClass(Router)
  // but does not work
  router: asFunction(() => new Router()),

  apiRouter: asValue(apiRouter),

  routes: asFunction(createRoutes),

  cacheService: asFunction(createCacheService),

  usersRoutes: asFunction(createUsersRoutes),
  postsRoutes: asFunction(createPostsRoutes),
  commentsRoutes: asFunction(createCommentsRoutes),
  authRoutes: asFunction(createAuthRoutes),

  database: asFunction(createMongooseDBProvider),

  userModel: asFunction(createUserModel),

  userController: asFunction(createUserController),

  middlewares: asFunction(createMiddlewares),

  utils: asValue(utils),
});


export default diContainer;
