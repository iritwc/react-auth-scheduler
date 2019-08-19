var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema(
  {
    room: {type: String, required: true, enum: ['A', 'B', 'C'] },
    user_name: {type: String, required: true, max: 100},
    user_email: {type: String, required: true, max: 100},
    start_date: {type: Date},
    end_date: {type: Date},
  }
);

module.exports = mongoose.model('Booking', BookingSchema);