const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.post('/message', MessageController.createMessage);
router.get('/message', MessageController.getAllMessages);
router.get('/message/:id', MessageController.findOneMessageById);
router.delete('/message/:id', MessageController.deleteOneMessageById);
router.put('/message/:id', MessageController.updateOneMessageById);

module.exports = router;
