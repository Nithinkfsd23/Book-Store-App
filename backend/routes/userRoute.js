const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userData = require('../model/userData');
const jwt = require("jsonwebtoken");
const adm= require("../authz/adm")

// Get user data for users page (no JWT authentication)
router.get('/getudata/:token/:role',adm, async (req, res) => {
    const data = await userData.find();
    try {

        jwt.verify(req.params.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    res.json({ "message": "Success", data });
                }
                else {
                    res.json({ message: "Unauthorised User" })
                }
            })

    } catch (error) {
        res.json({ message: "Not successful" });
    }
});

// Post user data to the database 
router.post('/postudata',  (req, res) => {
    try {

        const item = req.body;
        const newdata = new userData(item);

        jwt.verify(req.body.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    newdata.save();
                    res.json({ message: "User added successfully" });
                } else {
                    res.json({ message: "Unauthorised User" })
                }
            })
    } catch (error) {
        res.json({ message: "Post not successful" });
    }
});

// Update user data 
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

// Delete user data 
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
