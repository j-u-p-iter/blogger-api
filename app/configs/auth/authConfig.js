import Joi from 'joi';


export const createAuthConfig = (environmentObject) => {
  const envVarsSchema = Joi.object().keys({
    PASSWORD_SALT_ROUNDS: Joi.number().required(),
  }).unknown(true);;

  const {
    error,
    value: envVars,
  } = Joi.validate(environmentObject, envVarsSchema);

  if (error) { throw Error(`Auth config validation error: ${error.message}`); }

  const { PASSWORD_SALT_ROUNDS } = envVars;
  const authConfig = { PASSWORD_SALT_ROUNDS };

  return authConfig;
};

