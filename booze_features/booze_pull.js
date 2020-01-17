'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Grouping } = require('../models');

var boozePullRouter = express.Router();
const middleware = require('../middleware');

boozePullRouter.use(cors());
boozePullRouter.use(middleware.verifyToken);

boozePullRouter.get("/booze-pull/:token", (req, res) => {
	console.log('in get booze pull');

	Grouping.find()
	.then (groups => {
		res.json(groups);
	})
	.catch(err => {
		console.error(err);
		req.status(500).json({message: "internal server error"});
	});
});

module.exports = boozePullRouter