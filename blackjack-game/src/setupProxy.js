// // src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // specify the API route you want to proxy
    createProxyMiddleware({
      target: 'https://deckofcardsapi.com',
      changeOrigin: true,
    })
  );
};
