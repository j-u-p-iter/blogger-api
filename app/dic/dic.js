// Dependency Injection Container.
// Cause DI pattern rocks.
// (This is the only place where hardcoded dependencies should be located)

import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import {
  createContainer,
  asFunction,
  asValue,
} from 'awilix';

import createConfigs from 'configs';
import createHTTPServer from 'httpServer';
import createRoutes, {
  createUsersRoutes,
  createPostsRoutes,
  createCommentsRoutes,
  createAuthRoutes,
} from 'routes';
import {
  createMongooseDBProvider,
} from 'dbProviders';


const app = new Koa();
const apiRouter = new Router({ prefix: '/api/v1' });
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

  usersRoutes: asFunction(createUsersRoutes),
  postsRoutes: asFunction(createPostsRoutes),
  commentsRoutes: asFunction(createCommentsRoutes),
  authRoutes: asFunction(createAuthRoutes),

  dbProviders: asValue({ mongoose }),

  database: asFunction(createMongooseDBProvider),
});


export default diContainer;
