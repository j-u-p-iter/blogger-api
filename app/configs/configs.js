import { createServerConfig } from './server';
import { createDBConfig } from './db';
import { createRedisConfig } from './redis';
import { createAuthConfig } from './auth';


const processENV = process.env;

const createConfigs = () => ({
  ...createServerConfig(processENV),
  ...createDBConfig(processENV),
  ...createRedisConfig(processENV),
  ...createAuthConfig(processENV),
});


export default createConfigs;
