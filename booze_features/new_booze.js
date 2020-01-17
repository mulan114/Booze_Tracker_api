'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Booze } = require('../models');
const { Grouping } = require('../models');

var newBoozeRouter = express.Router();
const middleware = require('../middleware');

newBoozeRouter.use(middleware.verifyToken);

newBoozeRouter.post("/new-booze/:token", (req, res) => {
	console.log('in post add-booze');
	console.log(req);
	//delete the currentBooze section when we add code that pulls it in

	let invInfo = {
		date: req.body.invDate,
		amount: req.body.invAmt
	}

	console.log('this is invInfo in new booze');
	console.log(invInfo);

	let newBooze = new Booze();
	newBooze.type = req.body.type;
	newBooze.brand = req.body.brand;
	newBooze.name = req.body.name;
	newBooze.prevUsage = 0;
	newBooze.currentUsage = 0;
	newBooze.lastAmt = req.body.invAmt;
	newBooze.lastDate = req.body.invDate;
	newBooze.inv_amts.push(invInfo);

	newBooze.save()
	.then(boozeAdded => {
		res.status(200).json({
			message: "This is the booze",
			data: boozeAdded
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "Something happened when updating booze status",
			data: err
		});
	});

	let newGrouping = new Grouping();
	newGrouping.type = req.body.type;
	newGrouping.brand = req.body.brand;
	newGrouping.name = req.body.name;

	newGrouping.save()
	.then(groupingAdded => {
		res.status(200).json({
			message: "This is the group",
			data: groupingAdded
		});
	})
	.catch(err => {
		res.status(500).json({
			message: "Something happened when updating booze status",
			data: err
		});
	});
});

module.exports = newBoozeRouter;
