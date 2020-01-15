'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Booze } = require('../models');
const { User } = require('../models');

var inventoryRouter = express.Router();
const middleware = require('../middleware');

inventoryRouter.use(middleware.verifyToken);

inventoryRouter.get("/inventory/:token", (req, res) => {
	console.log('in get inventory');
	Booze.find()
	.then(boozes => {
		res.json(boozes);
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({message: "internal server error"});
	});
});

inventoryRouter.post("/inventory/:token", (req, res) => {
	console.log('in post inventory');
	console.log(req.body);
	let invAmt = parseFloat(req.body.invAmt).toFixed(1);
	let invInfo = {
		date: req.body.invDate,
		amount: invAmt
	}
	console.log(invInfo);

	Booze.findOne({_id: req.body.id})
	.then(booze => {
		booze.prevUsage = booze.currentUsage.toFixed(1);
		booze.currentUsage = (booze.lastAmt - invAmt).toFixed(1);
		booze.lastDate = req.body.invDate;
		booze.lastAmt = invAmt;
		booze.inv_amts.push(invInfo);
		booze.save()
		.then(boozeUpdate => {
			res.status(200).json({
				message: "This is the booze",
				data: boozeUpdate
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Something happened when updating booze status",
				data: err
			});
		})
	})
	.catch(err => {
		console.error(err);
		req.status(500).json({message: "internal server error"});
	});
});

module.exports = inventoryRouter;
