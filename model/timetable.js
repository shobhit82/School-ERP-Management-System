const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
    subject: {
        type: String,
        default: ""
    },

    teacher: {
        type: String,
        default: ""
    }
});

const daySchema = new mongoose.Schema({

    period1: periodSchema,

    period2: periodSchema,

    period3: periodSchema,

    period4: periodSchema,

    period5: periodSchema,

    period6: periodSchema,

    period7: periodSchema,

    period8: periodSchema

}, { _id: false });


const timetableSchema = new mongoose.Schema({

    className: {
        type: String,
        required: true
    },

    roomNumber: {
        type: String,
        required: true
    },

    classTeacher: {
        type: String,
        required: true
    },

    shift: {
        type: String,
        default: "Morning"
    },

    totalPeriods: {
        type: Number,
        default: 8
    },

    session: {
        type: String,
        default: "2026-27"
    },

    monday: daySchema,

    tuesday: daySchema,

    wednesday: daySchema,

    thursday: daySchema,

    friday: daySchema,

    saturday: daySchema

});

module.exports = mongoose.model("Timetable", timetableSchema);