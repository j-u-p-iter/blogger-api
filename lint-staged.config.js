const lintStagedConfig = {
  '*.js': [
    'eslint --fix',
    'cross-env NODE_PATH=./app jest --bail --findRelatedTests',
    'git add',
  ],
};


module.exports = lintStagedConfig;
