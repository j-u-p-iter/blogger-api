import Joi from 'joi';


export const createDBConfig = (environmentObject) => {
  const envVarsSchema = Joi.object().keys({
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required().min(5),
  }).unknown(true);

  const {
    error,
    value: envVars,
  } = Joi.validate(environmentObject, envVarsSchema);

  if (error) {
    throw Error(`DB config validation error: ${error.message}`);
  }

  const {
    DB_PORT,
    DB_HOST,
    DB_NAME,
  } = envVars;

  const databaseConfig = {
    DB_PORT,
    DB_HOST,
    DB_NAME,
  };

  return databaseConfig;
};
