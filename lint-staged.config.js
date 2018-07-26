const lintStagedConfig = {
  '*.js': [
    'eslint --fix',
    'jest --bail --findRelatedTests',
    'git add',
  ],
};


module.exports = lintStagedConfig;
