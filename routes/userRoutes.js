const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT')


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user existing
        const userExist = await User.findOne({email})

        //user not exist
        if(!userExist){
            res.status(400).send("Incorrect username or password");
            return;
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if(passwordMatch){
            res.status(200).send({
                jwt: generateJWT({email})
            })
        }
        else {
            res.status(400).send("invalid password or email");
        }
    } catch (err){
        res.status(500).json({err: err.message})
    }
})

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user existing
        const userExist = await User.findOne({ email })

        //user exist
        if(userExist){
            res.status(200).send({message: "This Account is already exist"});
            return;
        }


        //user is not exist
        // 1- hash password
        const hashPassword = await bcrypt.hash(password, 10);
        // 2- add hash password to the database
        const newUser = new User({ email, password: hashPassword});
        // 3- save new user
        newUser.save();
        // 4- get token
        res.status(200).json({
            jwt: generateJWT({email})
        })

    } catch(err) {
        res.status(500).json({err: err.message})
    }

});

router.get('/users', async (req, res) => {
    const users = await User.find();
    
    res.status(200).json(users);
    
  });
  

module.exports = router;
