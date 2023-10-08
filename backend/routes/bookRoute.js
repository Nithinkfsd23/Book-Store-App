const express = require('express');
const router = express.Router();
const bookData = require('../model/bookData'); // Import your Book model

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Get all book data
router.get('/getbdata', async (req, res) => {
    try {
        const data = await bookData.find();
        res.json({ message: "Success", data });
    } catch (error) {
        res.json({ message: "Failed to retrieve book data" });
    }
});

// Post book data 
router.post('/postbdata', async (req, res) => {
    try {
        const item = req.body;
        const newdata = new bookData(item);
        await newdata.save();
        res.json({ message: "Book added successfully" });
    } catch (error) {
        res.json({ message: "Not successful" });
    }
});

// Update book data (without image)
router.put('/putbdata/:id', async (req, res) => {
    try {
        const item = req.body;
        const index = req.params.id;

        await bookData.findByIdAndUpdate(index, item).exec();
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.json({ message: "Updation not successful" });
    }
});

// Delete book data
router.delete('/delbdata/:id', async (req, res) => {
    try {
        const ind = req.params.id;
        await bookData.findByIdAndDelete(ind).exec();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.json({ message: 'Deletion not successful' });
    }
});

module.exports = router;
