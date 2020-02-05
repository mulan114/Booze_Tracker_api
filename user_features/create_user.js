'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { User } = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

var createUserRouter = express.Router();

createUserRouter.post("/create-user", (req, res) => {
    console.log('in create-user - back');
    if (!(req.body.organization) || !(req.body.uName) || !(req.body.lName) || !(req.body.lName) || !(req.body.pWord)) {
        res.status(401).json({
            message: `All fields must be completed`
        });
        return;
    }
    User.findOne({uName: req.body.uName})
        .then((user) => {
            if(user){
                res.status(404).json({
                    message: 'This user already exists'
                });
                return;
            }

            const newUser = new User();
            newUser.organization = req.body.organization;
            newUser.lName = req.body.lName;
            newUser.fName = req.body.fName;
            newUser.uName = req.body.uName;

            bcrypt.hash(req.body.pWord, 10)
                .then(function (hash) {
                    newUser.pWord = hash;
                    console.log(newUser);
                    newUser
                        .save()
                        .then(user => {
                            let userToken = {
                                uName: user.uName,
                                id: user._id
                            };

                            let token = jwt.sign(userToken, config.JWT_SECRET);
                            console.log(token);

                            res.status(200).json({
                                message: ` ${user.uName} successfully created and logged in `,
                                data: {
                                    userId: user._id,
                                    token: token,
                                    uName: user.uName
                                }
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Something has happened in user",
                                data: err
                            });
                        });
                })
                .catch(function (err) {
                    console.log(err);

                    res.status(500).json({
                        message: "Something has happened in bcrypt",
                        err: err
                    });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something has happened",
                data: err
            });
        });
    });
});

module.exports = createUserRouter;
