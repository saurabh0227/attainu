const express = require('express');
const { create, fetch, update, remove } = require('./controller');
const { verifyToken } = require('../auth/controller');

const router = express.Router();

router.post('/add', verifyToken, create);
router.get('/fetch', verifyToken, fetch);
router.put('/update/:id', verifyToken, update);
router.put('/remove/:id', verifyToken, remove);

module.exports = router;
