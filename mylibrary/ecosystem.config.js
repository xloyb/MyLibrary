module.exports = {
    apps: [
      {
        name: 'mydevify-app',
        script: 'node_modules/.bin/next',
        args: 'start',
        env: {
          PORT: 4000,
          NODE_ENV: 'production',
        },
        cwd: '/home/mydevify.com/library.mydevify.com',
      },
    ],
  };
  