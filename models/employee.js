const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    nic: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        maxlength: 50
    },
    availability: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;