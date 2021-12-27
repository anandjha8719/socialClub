const express = require('express');

const router = express.router();
const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);

module.exports = router;