const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  console.log("proxy");
  app.use(
    '/services',
    createProxyMiddleware({
      target: 'https://svcs.ebay.com/',
      changeOrigin: true,
    })
  );
};