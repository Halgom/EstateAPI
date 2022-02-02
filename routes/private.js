const express = require('express');
const router = express.Router();

const privateCtrl = require('../controllers/private');

router.post('/', privateCtrl.createEstate);
router.put('/:id', privateCtrl.modifyEstate);
router.delete('/:id', privateCtrl.deleteEstate);

module.exports = router;
