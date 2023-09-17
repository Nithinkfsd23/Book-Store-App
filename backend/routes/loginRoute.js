const express = require('express')
const userData = require('../model/userData')
const router = express.Router();

const jwt = require('jsonwebtoken'); //for authorisation


router.use(express.json());
router.use(express.urlencoded({ extended: true }))


//LOGIN API
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const user = await userData.findOne({ username: username })

    if (!user) {
        res.json({ message: "User not found !!" })
    }
    try {
        if (user.password == password) {
            jwt.sign({ email: username, id: user._id }, "ict", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        res.json({ message: "Token not generated" })

                    } else {
                        res.json({ message: "Login Successfull!!", token: token, data: user })
                    }
                })

        }
        else {
            res.json({ message: "Login Failed!!" })
        }
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router; 