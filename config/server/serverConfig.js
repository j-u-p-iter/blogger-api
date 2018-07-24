import Joi from 'joi';


const createServerConfig = (environmentObject) => {
  const envVarsSchema = Joi.object().keys({
    SERVER_PORT: Joi.number().required(),
    SERVER_HOST: Joi.string().required(),
  }).unknown(true);

  const {
    error,
    value: envVars,
  } = Joi.validate(environmentObject, envVarsSchema);

  if (error) {
    throw Error(`Config validation error: ${error.message}`);
  }

  const {
    SERVER_PORT,
    SERVER_HOST,
  } = envVars;

  const serverConfig = {
    server: {
      PORT: SERVER_PORT,
      HOST: SERVER_HOST,
    },
  };

  return serverConfig;
};


export default createServerConfig;
