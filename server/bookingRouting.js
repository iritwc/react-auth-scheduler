
var BookingController = require('./bookingController');

var express = require('express');
var router = express.Router();

router.get('/', BookingController.bookings_get);

router.post('/create', BookingController.booking_create);

router.get('/:id', BookingController.booking_detail);

router.post('/:id/update', BookingController.booking_update);

router.delete('/:id/delete', BookingController.booking_delete);

module.exports = router;