module.exports = {
  plugins: {
    'postcss-path-replace': {
      publicPath: process.env.NEXT_PUBLIC_BASE_PATH || '',
      matched: /\/assets\/(icons|images|fonts)/g,
      mode: 'append',
    },
  },
};
