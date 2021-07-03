const express = require('express');
const substationController = require('../controllers/substationController');

const router = express.Router();

router.get('/all', substationController.substation_index);
router.get('/:id', substationController.substation_details);
router.get('/update', substationController.substation_update_put);

module.exports = router;