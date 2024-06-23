const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/DepositController');

router.post('/deposit',DepositController.uplaod, DepositController.createDeposit);
router.get('/deposit', DepositController.getAllDeposits);
router.get('/deposit/:id', DepositController.findOneDepositById);
router.delete('/deposit/:id', DepositController.deleteOneDepositById);
router.put('/deposit/:id', DepositController.updateOneDepositById);

module.exports = router;
