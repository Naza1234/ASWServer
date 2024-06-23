const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/user', UserController.createUser);
router.post('/user-login', UserController.loginUser);
router.get('/user', UserController.getAllUsers);
router.get('/user/:id', UserController.findOneUserById);
router.delete('/user/:id', UserController.deleteOneUserById);
router.put('/user/:id', UserController.updateOneUserById);

module.exports = router;
