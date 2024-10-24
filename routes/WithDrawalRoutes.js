const express = require('express');
const router = express.Router();
const WithDrawalController = require('../controllers/WithDrawalController');

router.post('/withDrawal', WithDrawalController.createWithDrawal);
router.get('/withDrawal', WithDrawalController.getAllWithDrawals);
router.get('/withDrawal/:id', WithDrawalController.findOneWithDrawalById);
router.get('/withDrawal/withDrawal/:id', WithDrawalController.findAllWithDrawalById);
router.delete('/withDrawal/:id', WithDrawalController.deleteOneWithDrawalById);
router.put('/withDrawal/:id', WithDrawalController.updateOneWithDrawalById);

module.exports = router;
