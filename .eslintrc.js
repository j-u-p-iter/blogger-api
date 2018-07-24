const eslintConfig = {
  env: {
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['app']
      },
    },
  },
};


module.exports = eslintConfig;
