const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/all', bookingController.booking_index);
router.post('/confirm', bookingController.booking_create_post);
router.put('/cancel', bookingController.booking_cancel_put);
router.get('/:id', bookingController.booking_details);
router.post('/perday', bookingController.booking_perday);
router.put('/update', bookingController.booking_update_put);

module.exports = router;