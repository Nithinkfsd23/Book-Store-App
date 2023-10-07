const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userData = require('../model/userData');
const bookData = require('../model/bookData')
const rentData = require('../model/rentData')


router.get('/getBookById/:id', async (req, res) => {
    try {
        const data = await bookData.find();
        res.json({ "message": "Success", data });
    } catch (error) {
        res.json({ message: "Not successful" });
    }
});

router.get('/getUserById/:id', async (req, res) => {
    try {
        const data = await userData.find();
        res.json({ "message": "Success", data });
    } catch (error) {
        res.json({ message: "Not successful" });
    }
});


router.post('/postRentData', async (req, res) => {
    try {
        const item = req.body;
        const newdata = new rentData(item);
        await newdata.save();
        res.json({ message: "Post successfully" });
    } catch (error) {
        res.json({ message: "Post not successful" });
    }
});



module.exports = router;
