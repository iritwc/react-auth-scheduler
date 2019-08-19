var Booking = require("./bookingSchema");
var async = require('async');

var trySave = (booking, cb) => {
  async.parallel({
    condition0: function (callback) {
      Booking.find({
        room: booking.room,
        start_date: booking.start_date
      }, '_id').exec(callback);
    },

    condition1: function (callback) {
      Booking.find({
        room: booking.room,
        start_date: {$lt: booking.start_date},
        end_date: {$gt: booking.start_date}
      }, '_id').exec(callback);
    },

    condition2: function (callback) {
      Booking.find({
        room: booking.room,
        start_date: {$lt: booking.end_date},
        end_date: {$gt: booking.end_date}
      }, '_id').exec(callback);
    },

    condition3: function (callback) {
      Booking.find({
        room: booking.room,
        end_date: booking.end_date
      }, '_id').exec(callback);
    },

    condition4: function (callback) {
      Booking.find({
        room: booking.room,
        start_date: {$gt: booking.start_date, $lt: booking.end_date},
      }, '_id').exec(callback);
    }
  }, cb);
};

exports.bookings_get =  function(req, res, next) {
  Booking.find()
    .sort([['start_date', 'ascending']])
    .exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
};

exports.booking_detail = function(req, res, next) {
  Booking.findById(req.params.id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
};

exports.booking_create =  function(req, res, next) {
  const {room, user_name, user_email, start_date, end_date} = req.body;
  const newBooking = new Booking();// booking);
  newBooking.room = room;
  newBooking.user_name = user_name;
  newBooking.user_email = user_email;
  newBooking.start_date = start_date;
  newBooking.end_date = end_date;

  trySave(newBooking, function (err, results) {
    console.log("Results", results, "err", err);
    if (err) {
      return res.json({success: false, error: err});
    } else {
      if (!results || results.condition0.length>0 || results.condition1.length>0 || results.condition2.length>0 || results.condition3.length>0 || results.condition4.length>0) {
        return res.json({success: false, error: 'Cannot save booking. There seem to be an overlapping with another booking.'});

      } else { // success - no limit
        newBooking.save((err) => {
          if (err) return res.json({success: false, error: err});
          return res.json({success: true});
        });
      }
    }
  });
};

exports.booking_update =  function(req, res, next) {
  const {body: booking} = req;

  trySave(booking, function (err, results) {
    console.log("Results", results, "err", err);
    if (err) {
      return res.json({success: false, error: err});
    } else {
      if (!results || results.condition0.length>0 || results.condition1.length>0 || results.condition2.length>0 || results.condition3.length>0 || results.condition4.length>0) {
        return res.json({success: false, error: 'Cannot save booking. There seem to be an overlapping with another booking.'});
      } else { // success - no limit
        Booking.findByIdAndUpdate(req.params.id, booking, (err) => {
          if (err) return res.json({success: false, error: err});
          return res.json({success: true});
        });
      }
    }
  });
};

exports.booking_delete =  function(req, res, next) {
  const { id } = req.params;

  Booking.findByIdAndRemove(id, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};
