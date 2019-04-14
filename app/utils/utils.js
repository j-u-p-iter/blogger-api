import path from 'path';
import to from 'await-to-js';
import { makeUrl } from '@j.u.p.iter/node-utils';


const API_PATH_PART = '/api/v1';

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
      path: `${API_PATH_PART}/${path}`,
    });

    return url;
  };

  const extractResponse = async (promise) => {
    const [error, data] = await to(promise); 

    if (data) { return data; }

    const { status, response: { body } } = error;

    return { status, body };
  };

  const throwError = (error) => {
    if (!error) { return; }

    throw new Error(error.message)
  };

  return {
    responseWithSuccess,
    responseWithError,
    makeApiUrl,
    extractResponse,
    throwError,
  };
};
