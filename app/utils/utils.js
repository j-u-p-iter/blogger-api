import path from 'path';


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

  return {
    responseWithSuccess,
    responseWithError,
  };
};
