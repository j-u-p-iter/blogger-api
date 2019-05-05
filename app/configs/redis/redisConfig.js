import Joi from 'joi';


export const createRedisConfig = (environmentObject) => {
  const envVarsSchema = Joi.object().keys({
    REDIS_PORT: Joi.number().required(),
    REDIS_HOST: Joi.string().required(),
  }).unknown(true);

  const {
    error,
    value: envVars,
  } = Joi.validate(environmentObject, envVarsSchema);

  if (error) { throw Error(`Redis config validation error: ${error}`); }

  const { REDIS_PORT, REDIS_HOST } = envVars;
  const redisConfig = { REDIS_PORT, REDIS_HOST };

  return redisConfig;
};
