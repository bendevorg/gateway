const express = require('express');
const proxy = require('http-proxy-middleware');
const timer = require('../utils/timer');
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('../utils/logger');

const router = express.Router();

const routesPath = process.cwd() + '/.routes';
let routes = [];

// Get our routes
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(file => {
    if (file.indexOf('.json') !== -1) routes.push(require(routesPath + '/' + file)[process.env.NODE_ENV]);
  });
}

router.use(timer);

routes.forEach(route => {
  router.use(`/${route.name}`,
    proxy({
      target: route.path,
      changeOrigin: true,
      pathRewrite: (path, req) => path.replace(`/${route.name}`, ''),
      onProxyReq: (proxyReq, req, res) => {
        bodyParser.json()(req, res, () => {});
      },
      onProxyRes: (proxyRes, req, res) => {
        res.data = '';
        proxyRes.on('data', (data) => {
          data = data.toString('utf-8');
          res.data += data;
          logger(res, req);
        });
      }
    })
  );
});

module.exports = router;
