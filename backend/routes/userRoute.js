const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userData = require('../model/userData');

// Get user data for users page (no JWT authentication)
router.get('/getudata', async (req, res) => {
    try {
        const data = await userData.find();
        res.json({ "message": "success", data });
    } catch (error) {
        res.json({ message: "Not successful" });
    }
});

// Post user data to the database (no JWT authentication)
router.post('/postudata', async (req, res) => {
    try {
        const item = req.body;
        const newdata = new userData(item);
        await newdata.save();
        res.json({ message: "Posted successfully" });
    } catch (error) {
        res.json({ message: "Post not successful" });
    }
});

// Update user data (no JWT authentication)
router.put('/putudata/:id', async (req, res) => {
    try {
        const item = req.body;
        const index = req.params.id;
        await userData.findByIdAndUpdate(index, item).exec();
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.json({ message: "Updation not successful" });
    }
});

// Delete user data (no JWT authentication)
router.delete('/deludata/:id', async (req, res) => {
    try {
        const ind = req.params.id;
        await userData.findByIdAndDelete(ind).exec();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.json({ message: 'Deletion not successful' });
    }
});

module.exports = router;
