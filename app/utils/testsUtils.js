import request from 'superagent';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export const generateString = length => {
  let resultString = getRandomLetter();

  while(resultString.length !== length) {
    resultString = resultString + getRandomLetter();
  }

  return resultString;
};

export const signUpUser = async ({ url, user, extractResponse }) => {
  const { body: { user: { id: userId }, accessToken } } = await extractResponse(request.post(url, user));

  return { userId, accessToken };
};
