const express = require('express');
const { read, write } = require('../utils/file-utils');

const users = express.Router();

// users.get();

module.exports = { users };