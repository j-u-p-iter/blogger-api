import bcrypt from 'bcrypt';
import to from 'await-to-js';
import { sign, verify } from 'jsonwebtoken';

export const createAuthenticationService = ({
  utils: { throwError },
  configs: { PASSWORD_SALT_ROUNDS, AUTH_TOKEN_SECRET },
}) => {
  const hashPassword = async (password) => {
    const [error, hashedPassword] =  await to(bcrypt.hash(password, PASSWORD_SALT_ROUNDS)); 

    throwError(error);

    return hashedPassword;
  };

  const checkPassword = async (newPassword, originalHashedPassword) => {
    const [error, arePasswordsEqual] = await to(bcrypt.compare(newPassword, originalHashedPassword));

    throwError(error);

    return arePasswordsEqual;
  };

  const generateToken = (userData) => {
    return sign(userData, AUTH_TOKEN_SECRET);
  };

  const decodeToken = (accessToken) => {
    return verify(accessToken, AUTH_TOKEN_SECRET);
  };

  return {
    hashPassword,
    checkPassword,
    generateToken,
    decodeToken,
  };
};
