const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/all', employeeController.employee_index);
router.get('/:id', employeeController.employee_details);
router.get('/update', employeeController.employee_update_put);

module.exports = router;