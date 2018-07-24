const lintStagedConfig = {
  '*.js': [
    'eslint --fix',
    'git add',
  ],
};


module.exports = lintStagedConfig;
