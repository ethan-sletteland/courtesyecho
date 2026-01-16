module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['html'],
  overrides: [
    {
      files: ['*.html'],
      processor: 'html/html',
    },
  ],
};
