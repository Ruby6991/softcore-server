
const Booking = require('../models/booking');

const booking_index = (req, res) => {
  Booking.find()
    .then(result => {
      let bookings = result;
      for(let a=0; a<bookings.length; a++){
        const id = bookings[a].id;
        if(booking.startTime< new Date()){
          Booking.findByIdAndUpdate(id, {
            status:'completed'
        },{new: true})
          .then(result => {
            console.log('successful');
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
  });
  Booking.find()
    .then(result => {
      res.json({
        bookings:result
      })
    })
    .catch(err => {
      console.log(err);
  });
}

const booking_perday = (req, res) => {
  let bookingDate = req.body.dateCheck;
  let endDate = new Date(bookingDate);
  endDate.setDate(endDate.getDate()+1);

  splitBookingDate= bookingDate.split("T");
  splitEndDate= endDate.toISOString().split("T");

  Booking.find({startTime: {$gte: splitBookingDate[0], $lte:splitEndDate[0]}})
    .then(result => {
      console.log(result);
      res.json({
        bookings:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const booking_details = (req, res) => {
  const id = req.params.bookingID;
  Booking.findById(id)
    .then(result => {
      res.json({
        bookings:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const booking_create_post = (req, res) => {
    const booking = new Booking(req.body);
    booking.save()
        .then(result => {
          res.json({
            message:'Appointment Creation Successful!'
          })
        })
        .catch(err => {
        console.log(err);
        });
}

const booking_cancel_put = (req, res) => {
    const id = req.body.bookingID;
    console.log(id);
    Booking.findByIdAndUpdate(id, {
        status: 'cancelled'
    },{new: true})
      .then(result => {
        res.send(result);
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
}

const booking_update_put = (req, res) => {
  const assignedBookings = req.body.assignedBookings;
  console.log(assignedBookings[0]);
  for(let a=0; a<assignedBookings.length; a++){
    let id = assignedBookings[a].booking._id;
    Booking.findByIdAndUpdate(id, {
      substation:assignedBookings[a].substation.value,
      employee:assignedBookings[a].employee.value
  },{new: true})
    .then(result => {
      console.log("station and employees assigned successfully");
    })
    .catch(err => {
      console.log(err);
    });
  }
  
}

module.exports = {
    booking_index, 
    booking_details,  
    booking_create_post,
    booking_cancel_put,
    booking_perday,
    booking_update_put
}