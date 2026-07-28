const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    admission: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    chooseclass: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    admissiondate: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    mothername: {
        type: String,
        required: true
    },
    fathernumber: {
        type: String,
        required: true
    },
    mothernumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model('student', studentSchema);