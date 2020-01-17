'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { Booze } = require('../models');

var addInventoryRouter = express.Router();
const middleware = require('../middleware');

addInventoryRouter.use(cors());
addInventoryRouter.use(middleware.verifyToken);

addInventoryRouter.post("/add-inventory/:token", (req, res) => {
	console.log('in post add inventory');

	Booze.findOne({
		type: req.body.type,
		brand: req.body.brand,
		name: req.body.name
	})
	.then(booze => {
		booze.lastDate = req.body.pur_amts.purDate;
		booze.lastAmt += parseInt(req.body.pur_amts.amount);
		booze.inv_amts.push(req.body.pur_amts);
		booze.pur_amts.push(req.body.pur_amts);
		booze.save()
	})
	.then ((boozeAdded) => {
		res.json(boozeAdded);
	})
	.catch(err => {
		console.error(err);
		req.status(500).json({message: "internal server error"});
	});
});

module.exports = addInventoryRouter