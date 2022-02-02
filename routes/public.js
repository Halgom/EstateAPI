const express = require('express');
const router = express.Router();

const publicCtrl = require('../controllers/public');

router.get('/', publicCtrl.getEstates);

module.exports = router;
