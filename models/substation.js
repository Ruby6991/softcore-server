const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const substationSchema = new Schema({
    stationNo: {
        type: Number,
        required: true,
        unique: true
    },
    stationType: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true,
        maxlength: 50
    }
}, { timestamps: true });

const Substation = mongoose.model('Substation', substationSchema);
module.exports = Substation;