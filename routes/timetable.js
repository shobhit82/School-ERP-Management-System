const express = require("express");
const router = express.Router();

const Timetable = require("../model/timetable");

router.get("/", async (req, res) => {

    const timetables = await Timetable.find();

    console.log(timetables);

    res.render("timetable/timetable", {
        timetables
    });

});
router.get("/edit/:id", async (req, res) => {

    const timetable = await Timetable.findById(req.params.id);

    res.render("timetable/editTimetable", {
        timetable
    });

});

router.post("/update/:id", async (req, res) => {

    try {

        const timetable = await Timetable.findById(req.params.id);

        timetable.roomNumber = req.body.roomNumber;

        timetable.classTeacher = req.body.classTeacher;

        timetable.shift = req.body.shift;

        timetable.totalPeriods = req.body.totalPeriods;

        const days = [

            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"

        ];

        for (const day of days) {

            for (let i = 1; i <= 8; i++) {

                timetable[day][`period${i}`].subject =
                    req.body[`${day}_period${i}_subject`];

                timetable[day][`period${i}`].teacher =
                    req.body[`${day}_period${i}_teacher`];

            }

        }

        await timetable.save();

        res.redirect("/timetable");

    }

    catch (err) {

        console.log(err);

        res.send("Something Went Wrong");

    }

});

module.exports = router;