import request from 'superagent';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export const generateString = (length = 5) => {
  let resultString = getRandomLetter();

  while(resultString.length !== length) {
    resultString = resultString + getRandomLetter();
  }

  return resultString;
};

export const generateEmail = length => {
  const localPart = generateString(7);
  const domain = generateString(8);

  const resultEmail = `${localPart}@${domain}.com`.toLowerCase();

  return resultEmail;
};

export const signUpUser = async ({ url, user, extractResponse }) => {
  const { body: { user: { id: userId }, accessToken } } = await extractResponse(request.post(url, user));

  return { userId, accessToken };
};

export const sendRequestWithToken = (requestObject, accessToken) => {
  return requestObject.set('Authorization', `Bearer ${accessToken}`); 
}
