const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const fileSystem = require('fs');


// REGISTER NEW CUSTOMER
const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }
    if(!req.file){
        res.status(400).json({ errors: 'Image is required' });
    }

    try {
        const name = req.body.name;
        const email = req.body.email;
        const photo = req.file.path;
        const password = req.body.password;
        const password2 = req.body.password_confirmation;

        if(password !== password2){
            return res.status(400).json({ msg: 'Password is not match' })
        }

        // Cek duplikasi email
        let cekUser = await User.findOne({email: email});
        if(cekUser){
            return res.status(400).json({ msg: 'Please use another email' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name: name,
            email: email,
            password: hashPassword,
            photo: photo,
            role: 'customer'
        });
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.status(200).json({ token })
            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' })
    }
}

// LOGIN
const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.body.email
        const password = req.body.password

        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).json('Invalid credentials')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err
                res.json({
                    token: token,
                    user: user
                })
            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// GET ALL CUSTOMER
const getAllCustomer = async (req, res) => {
    try {
        const customer = await User.find({role: 'customer'});

        res.status(200).json({
            customers: customer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    getAllCustomer
}