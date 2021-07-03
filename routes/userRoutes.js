const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/create', userController.user_create_get);
router.get('/all', userController.user_index);
router.post('/register', userController.user_create_post);
router.post('/authenticate', userController.user_authenticate)
router.get('/:id', userController.user_details);

module.exports = router;