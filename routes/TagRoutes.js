const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController');

router.post('/tag', TagController.createTag);
router.get('/tag', TagController.getAllTags);
router.get('/tag/:id', TagController.findOneTagById);
router.delete('/tag/:id', TagController.deleteOneTagById);
router.put('/tag/:id', TagController.updateOneTagById);

module.exports = router;
