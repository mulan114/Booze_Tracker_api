'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { User } = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

var loginUserRouter = express.Router();
loginUserRouter.use(cors());

loginUserRouter.post("/login", (req, res) => {
	console.log('i am in login - back');
    console.log(req.body);
    User.findOne({uName: req.body.uName})
        .then((user) => {
            if(!req.body.uName || !req.body.pWord){
                res.status(401).json({
                    message: 'You must enter a username and password'
                });
                return;
            }

            if(!user){
                res.status(404).json({
                    message: 'The user does not exist'
                });
                return;
            }

            if(!bcrypt.compareSync(req.body.pWord, user.pWord)){
                res.status(401).json({
                    message: 'Password does not match'
                });
                return;
            }

            let userToken = {
                uName: user.uName,
                id: user._id
            };

            let token = jwt.sign(userToken, config.JWT_SECRET);
            console.log(userToken);

            res.status(200).json({
                message: ` ${user.uName} successfully logged in`,
                data: {
                    userId: user._id,
                    token: token,
                    uName: user.uName
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something has happened at last catch",
                data: err
            });
        });
});

module.exports = loginUserRouter;
