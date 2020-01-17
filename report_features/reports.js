'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Booze } = require('../models');

var reportRouter = express.Router();
const middleware = require('../middleware');

reportRouter.use(cors());
reportRouter.use(middleware.verifyToken);

reportRouter.get("/show-reports/:token", (req, res) => {
	console.log('in show-reports');
	Booze.find()
	.then(boozes => {
		res.json(boozes);
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({message: "internal server error"});
	});
});

module.exports = reportRouter;