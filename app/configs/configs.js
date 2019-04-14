import { createServerConfig } from './server';
import { createDBConfig } from './db';
import { createAuthConfig } from './auth';


const processENV = process.env;

const createConfigs = () => ({
  ...createServerConfig(processENV),
  ...createDBConfig(processENV),
  ...createAuthConfig(processENV),
});


export default createConfigs;
