const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const bookData = require('../model/bookData'); 

// Get all book data
router.get('/getbdata', async (req, res) => {
    try {
        const data = await bookData.find();
        res.json({ message: "Success", data });
    } catch (error) {
        res.json({ message: "Failed to retrieve book data" });
    }
});





module.exports = router;
