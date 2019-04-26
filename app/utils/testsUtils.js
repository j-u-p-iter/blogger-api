const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export const generateString = length => {
  let resultString = getRandomLetter();

  while(resultString.length !== length) {
    resultString = resultString + getRandomLetter();
  }

  return resultString;
};

