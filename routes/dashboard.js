const express = require("express");
const mongoose = require('mongoose');
const student = require('../model/student');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('dashboard/dashboard')
});

router.get('/add', (req, res) => {
    res.render('dashboard/addNew')
})

router.post('/addNew', async (req, res) => {
    try {
        const { admission, firstname, lastname, dob, chooseclass, rollno, admissiondate, session, fathername, mothername, fathernumber, mothernumber, email, occupation, income, country, state, city, pincode, address } = req.body;

        const admissionExist = await student.findOne({
            admission: admission
        });

        if (admissionExist) {
            return res.render('dashboard/admissionExist', { student: admissionExist });
        }

        const existStudent = await student.findOne({
            chooseclass: chooseclass,
            rollno: rollno
        });

        if (existStudent) {
            return res.render('dashboard/studentExist', { student: existStudent });

        }

        const newStudent = new student({ admission, firstname, lastname, dob, chooseclass, rollno, admissiondate, session, fathername, mothername, fathernumber, mothernumber, email, occupation, income, country, state, city, pincode, address });

        await newStudent.save();
        res.render('dashboard/studentRegister', { student: newStudent });
    } catch (error) {
        console.log('error saving data:', error);
        res.status(500).send('An error occured while fetching the data.')
    }
});

router.post('/student-info', async (req, res) => {
    try {
        const { firstname, lastname, chooseclass, rollno } = req.body;

        const studentData = await student.findOne({
            firstname, lastname, chooseclass, rollno
        });

        if (!studentData) {
            return res.render('dashboard/student-error')

        }
        res.render('dashboard/student-info', ({ student: studentData }));
    } catch (error) {
        console.error('error fetching data:', error);
        res.status(500).send('An error ouccured while fetching the data.');
    }
});

router.get('/class/:classname', async (req, res) => {
    const classname = req.params.classname;
    const students = await student.find({
        chooseclass: classname
    });
    res.render('dashboard/class', {
        classname,
        students
    })
});

router.post('/delete/:id', async (req, res) => {
    try {
        await student.findByIdAndDelete(req.params.id);
        res.redirect(req.get('Referer') || '/dashboard');

    } catch (error) {
        console.log('error  deleting students:', error);
        res.send(500).send('error deleting the record');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const studentToEdit = await student.findById(req.params.id);

        res.render('dashboard/edit', { student: studentToEdit });
    } catch (error) {
        console.error('error finding students:', error);
        res.status(500).send('Error loading edit form.');
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { firstname, lastname, dob, fathernumber, email, address } = req.body;
       const updatedStudent= await student.findByIdAndUpdate(req.params.id, {
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            fathernumber: fathernumber,
            email: email,
            address: address
        });
        res.redirect('/dashboard/class/' + updatedStudent.chooseclass);
    } catch (error) {

    }
})

module.exports = router;