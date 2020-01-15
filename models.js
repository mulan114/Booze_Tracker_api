'use strict';

const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 1);

// schema to represent booze status

const userSchema = mongoose.Schema({
	organization: {type: String, required: true },
	uName: {type: String, required: true },
	fName: {type: String, required: true },
	lName: {type: String, required: true },
	pWord: {type: String, required: true }
})

const User = mongoose.model('User', userSchema);

const boozeSchema = mongoose.Schema({
	type: { type: String, required: true },
	brand: { type: String, required: true },
	name: { type: String, required: true },
	prevUsage: { type: Number },
	currentUsage: { type: Number },
	lastAmt: { type: Number },
	lastDate: { type: Date },
	inv_amts: [
		{
			date: Date,
			amount: { type: Float }
		}
	],
	pur_amts: [
		{
			date: Date,
			amount: Number
		}
	]
})

const Booze = mongoose.model('Booze', boozeSchema);

const groupingSchema = mongoose.Schema({
	type: { type: String },
	brand: { type: String },
	name: { type: String }
})

const Grouping = mongoose.model('Grouping', groupingSchema);


module.exports = { User, Booze, Grouping };