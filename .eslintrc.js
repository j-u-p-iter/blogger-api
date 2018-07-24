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
  rules: {
    'global-require': 0,
    'import/prefer-default-export': 0,
  },
};


module.exports = eslintConfig;
