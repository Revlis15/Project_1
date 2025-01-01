const express = require('express')
const User = require('./user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) =>{
    const {username, password} = req.body;
    try {
        const admin = await User.findOne({username})
        if (!admin) {
            res.status(404).send({messsage: "Admin not found!"})
            return
        }
       
        if (admin.password !== password) {
            res.status(401).send({message: "Invalid credentials!"})
            return
        }

        const token = jwt.sign(
            {id: admin._id, uid: admin.uid, email: admin.email, username: admin.username, role: admin.role},
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user:{
                username: admin.username,
                role: admin.role
            }
        })
    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({messsage: "Failed to login as admin"})
    }
})

router.post("/register", async (req, res) => {
    const { uid, email, username, role } = req.body;
    try {
        const user = new User({
            uid,
            email,
            username,
            role
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Failed to register user", error);
        res.status(500).json({ message: "Failed to register user" });
    }
});

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await User.findOne({ uid });
        if (user) {
            res.status(200).json({ role: user.role });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ message: "Server error while fetching user role" });
    }
});


module.exports = router