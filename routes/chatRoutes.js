const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/chartController');

router.post('/chat', MessageController.createMessage);
router.get('/chat/:id', MessageController.getAllMessages);
router.get('/chat/:id', MessageController.findOneMessageById);
router.delete('/chat/:id', MessageController.deleteOneMessageById);
router.put('/chat/:id', MessageController.updateOneMessageById);

module.exports = router;
