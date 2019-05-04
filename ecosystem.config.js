module.exports = {
  apps: [{
    name: 'blogger-api',
    script: './index.js',
    interpreter: 'babel-node',
    env: {
      NODE_ENV: 'development',
      NODE_PATH: './app',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
}
