module.exports = {
  apps: [{
    name: 'blogger-api',
    script: './app/index.js',
    watch: true,
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
