import { createServerConfig } from './server';
import { createDBConfig } from './db';


const processENV = process.env;

const createConfigs = () => ({
  ...createServerConfig(processENV),
  ...createDBConfig(processENV),
});


export default createConfigs;
