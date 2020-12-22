const { createProxyMiddleware } = require('http-proxy-middleware');

const { REACT_APP_URL } = process.env;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: REACT_APP_URL,
      changeOrigin: true
    })
  );
};
