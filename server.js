require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 1234;
const insertTimetable = require("./seed/timetableSeed");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// routes

app.use('/', require("./routes/home"));
app.use('/timetable', require("./routes/timetable"));
app.use('/noticeboard', require("./routes/noticeboard"));
app.use('/dashboard', require('./routes/dashboard'))
app.use('/library', require('./routes/library'));

// MongoDB Connect

// const mongoURI = 'mongodb://127.0.0.1:27017/Student-Management-System-Data';

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connect to MongoDB successfully!");

        await insertTimetable();

        app.listen(port, () => {
            console.log(`App listening at port ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });




