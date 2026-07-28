const express = require("express");
const book = require('../model/book');

const router = express.Router();


router.get('/', async (req,res)=>{

    try{

        const issueBook = await book.find();


        let totalFine = 0;


        issueBook.forEach((item)=>{


            const today = new Date();

            const returnDate = new Date(item.returndate);


            if(today > returnDate){


                const diffTime = today - returnDate;


                const lateDays = Math.floor(
                    diffTime / (1000 * 60 * 60 * 24)
                );


                const fine = Math.floor(lateDays / 7) * 50;


                totalFine += fine;


            }


        });



        const totalBooks = await book.countDocuments();



        res.render('library/library',{

            issueBook,

            totalBooks,

            totalFine

        });



    }
    catch(error){

        console.log(error);

        res.status(500).send("Error");

    }


});


router.get('/add', (req, res) => {

    res.render('library/issuebook');

});



router.post('/add', async (req, res) => {

    try {

        const {
            chooseclass,
            rollno,
            bookname,
            issuedate,
            issueduration,
            issueby
        } = req.body;

        const returnDate = new Date(issuedate);

        returnDate.setDate(returnDate.getDate() + 7);


        // Date format YYYY-MM-DD
        const formattedReturnDate = returnDate.toISOString().split('T')[0];

        const bookdata = await book.create({

            chooseclass,
            rollno,
            bookname,
            issuedate,
            issueduration,
            issueby,
            returndate: formattedReturnDate
        });


        console.log("Book Issued:", bookdata);


        res.redirect('/library');


    } catch (error) {

        console.error("Error while issuing book:", error);

        res.status(500).send(
            "An error occurred while issuing the book."
        );

    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        await book.findByIdAndDelete(req.params.id);
        res.redirect(req.get('Referer') || '/library');

    } catch (error) {
        console.log('error  deleting students:', error);
        res.send(500).send('error deleting the record');
    }
});

router.post('/reissue/:id', async (req, res) => {

    try {

        const today = new Date();


        // Issue Date = Today
        const issueDate = today.toISOString().split('T')[0];


        // Return Date = 7 Days After
        const returnDate = new Date();

        returnDate.setDate(
            returnDate.getDate() + 7
        );


        const newReturnDate = returnDate
            .toISOString()
            .split('T')[0];



        await book.findByIdAndUpdate(
            req.params.id,
            {

                issuedate: issueDate,

                returndate: newReturnDate,

                status: "Issued"

            }
        );



        res.redirect('/library');


    }
    catch (error) {

        console.log(error);

        res.status(500).send(
            "Error while re-issuing book"
        );

    }

});


module.exports = router;