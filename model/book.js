const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    chooseclass: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    bookname: {
        type: String,
        required: true
    },
    issuedate: {
        type: String,
        required: true
    },
    issueby: {
        type: String,
        required: true
    },
   
    issueduration: {
        type: String,
        default: "7 Days"
    },
    returndate: {
        type: String,
        
    }
})
module.exports = mongoose.model('book', bookSchema);