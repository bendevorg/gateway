const express = require('express');
const proxy = require('http-proxy-middleware');
const fs = require('fs');
const constants = require('../utils/constants');

const router = express.Router();

const routesPath = process.cwd() + '/.routes';
let routes = [];

// Get our routes
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(file => {
    if (file.indexOf('.json') !== -1) routes.push(require(routesPath + '/' + file)[process.env.NODE_ENV]);
  });
}

routes.forEach(route => {
  router.use(`/${route.name}`, proxy({ ...route.options, ...constants.routes.options }));
});

module.exports = router;
