const Timetable = require("../model/timetable");

function createDay() {
    return {
        period1: { subject: "English", teacher: "Mr. Sharma" },
        period2: { subject: "Math", teacher: "Mrs. Gupta" },
        period3: { subject: "Science", teacher: "Mr. Verma" },
        period4: { subject: "Hindi", teacher: "Mrs. Singh" },
        period5: { subject: "Computer", teacher: "Mr. Khan" },
        period6: { subject: "SST", teacher: "Mrs. Roy" },
        period7: { subject: "Drawing", teacher: "Mr. Das" },
        period8: { subject: "Games", teacher: "Coach Amit" }
    };
}

async function insertTimetable() {

    const total = await Timetable.countDocuments();

    if (total > 0) {
        console.log("Timetable already exists.");
        return;
    }

    const classes = [];

    for (let i = 1; i <= 8; i++) {

        classes.push({

            className: `Class ${i}`,

            roomNumber: `${100 + i}`,

            classTeacher: `Teacher ${i}`,

            shift: "Morning",

            totalPeriods: 8,

            session: "2026-27",

            monday: createDay(),

            tuesday: createDay(),

            wednesday: createDay(),

            thursday: createDay(),

            friday: createDay(),

            saturday: createDay()

        });

    }

    await Timetable.insertMany(classes);

    console.log("Timetable inserted successfully.");
}

module.exports = insertTimetable;