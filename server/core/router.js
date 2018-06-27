const express = require('express');
const proxy = require('express-http-proxy');
const timer = require('../utils/timer');
const fs = require('fs');
const constants = require('../utils/constants');

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

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
  router.use(`/${route.name}`, proxy(route.path, { ...route.options, ...constants.routes.options }));
});

module.exports = router;
