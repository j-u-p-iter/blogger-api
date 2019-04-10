import path from 'path';
import { makeUrl } from '@j.u.p.iter/node-utils';


export const setupEnvironment = () => {
  const resolvePath = relativePath => path.resolve(__dirname, relativePath);
  const { NODE_ENV } = process.env;
  const configPath = resolvePath(NODE_ENV === 'test' ? '../../.env.test' : '../../.env');

  require('dotenv').config({ path: configPath });
};

export const createUtils = ({
  configs: { SERVER_HOST, SERVER_PORT }
}) => {
  const responseWithSuccess = ({
    res,
    data = {},
    status,
    message,
  }) => {
    const resultData = {
      success: true,
      message,
      ...data,
    };

    res.status(status).json(resultData);
  };

  const responseWithError = ({
    res,
    err,
    status,
  }) => {
    const resultData = {
      success: false,
      error: err.message,
    };

    res.status(status).json(resultData)
  };

  const makeApiUrl = (path) => {
    const url = makeUrl({
      host: SERVER_HOST,
      port: SERVER_PORT,
      path: `api/v1/${path}`,
    });

    return url;
  };

  return {
    responseWithSuccess,
    responseWithError,
    makeApiUrl,
  };
};
