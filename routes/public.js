const express = require('express');
const router = express.Router();

const publicCtrl = require('../controllers/public');

router.get('/', publicCtrl.getEstates);
router.get('/test', publicCtrl.testWorking);

module.exports = router;
