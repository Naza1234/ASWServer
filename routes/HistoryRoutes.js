const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');

router.post('/history', HistoryController.createHistory);
router.get('/history', HistoryController.getAllHistorys);
router.get('/history/:id', HistoryController.findOneHistoryById);
router.delete('/history/:id', HistoryController.deleteOneHistoryById);
router.put('/history/:id', HistoryController.updateOneHistoryById);

module.exports = router;
