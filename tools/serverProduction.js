'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const cors = require('cors');
const logger = require('./logger');

const app = express();

app.options(true, cors());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use(router);
app.use(logger.errorHandler());

module.exports = app;
