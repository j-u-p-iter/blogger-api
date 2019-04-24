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
  createUserSchema,
  createPostSchema,
} from 'schemas';
import {
  createUserController,
  createAuthController,
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
  createAuthenticationService,
} from 'services';

import createMiddlewares from 'middlewares';
import { createUtils, setupEnvironment } from 'utils';
import { createUsersUrls, createAuthUrls } from 'urls';


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
  authenticationService: asFunction(createAuthenticationService),

  usersRoutes: asFunction(createUsersRoutes),
  authRoutes: asFunction(createAuthRoutes),
  postsRoutes: asFunction(createPostsRoutes),
  commentsRoutes: asFunction(createCommentsRoutes),

  usersUrls: asFunction(createUsersUrls),
  authUrls: asFunction(createAuthUrls),

  database: asFunction(createMongooseDBProvider),

  userSchema: asFunction(createUserSchema).singleton(),
  postSchema: asFunction(createPostSchema).singleton(),

  userModel: asFunction(createUserModel),

  userController: asFunction(createUserController),
  authController: asFunction(createAuthController),

  middlewares: asFunction(createMiddlewares),

  utils: asFunction(createUtils),

  setupEnvironment: asValue(setupEnvironment),
});


export { diContainer };
