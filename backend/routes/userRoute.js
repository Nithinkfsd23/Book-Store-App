const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userData = require('../model/userData');
const jwt = require("jsonwebtoken"); //for authorisation



//to get user data for users page
router.get('/getudata', async (req, res) => {
    const data = await userData.find();
    try {
        jwt.verify(req.params.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    res.json({ "message": "success", data });
                }
                else {
                    res.json({ message: "Unauthorised User" })
                }
            })

    } catch (error) {
        res.json({ message: "Not successful" });
    }
})

//to post user data to database
router.post('/postudata', (req, res) => {
    try {
        const item = req.body;
        const newdata = new userData(item);

        jwt.verify(req.body.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    newdata.save();
                    res.json({ message: "Posted successfully" });

                } else {
                    res.json({ message: "Unauthorised User" })
                }
            })
    } catch (error) {
        res.json({ message: "Post not successful" });
    }
})

//to update user data
router.put('/putudata/:id', async (req, res) => {
    try {
        const item = req.body;
        const index = req.params.id;
        const updatedData = userData.findByIdAndUpdate(index, item).exec();
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.json({ message: "Updation not successful" });
    }
})

//to delete user data
router.delete('/deludata/:id', (req, res) => {
    try {
        const ind = req.params.id;
        userData.findByIdAndDelete(ind).exec();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.json({ message: 'Deletion not successful' });
    }
})

module.exports = router;