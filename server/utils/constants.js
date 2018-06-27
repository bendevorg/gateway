/**
 * All project constants
 * @module utils/constants
 */
const logger = require('./logger');
module.exports = {
  messages: {
    info: {
    },
    error: {
    }
  },
  regex: {
  },
  values: {
  },
  routes: {
    options: {
      userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        proxyRes.data = proxyResData;
        logger(proxyRes, userReq);
        return proxyResData;
      }
    }
  }
};
