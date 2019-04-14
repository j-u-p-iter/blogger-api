import bcrypt from 'bcrypt';
import to from 'await-to-js';

export const createAuthenticationService = ({
  utils: { throwError },
  configs: { PASSWORD_SALT_ROUNDS },
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

  const generateToken = () => {

  };

  const decodeToken = () => {

  };

  return {
    hashPassword,
    checkPassword,
    generateToken,
    decodeToken,
  };
};
