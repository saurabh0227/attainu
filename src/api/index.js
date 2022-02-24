const express = require('express');

const users = require('./users/route');
const posts = require('./posts/router');

const router = express.Router();

router.use('/users', users);
router.use('/posts', posts);

module.exports = router;
