const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    vehicleNo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true,
        maxlength: 50
    },
    mileage: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    substation: {
        type: String
    },
    employee: {
        type:String
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;