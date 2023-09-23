const express = require('express');
const userData = require('../model/userData');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// LOGIN API
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const user = await userData.findOne({ username: username });

        if (!user) {
            res.json({ message: "User not found!" });
            return;
        }

        if (user.password === password) {
            res.json({ message: "Login successful!", data: user });
        } else {
            res.json({ message: "Login failed!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
