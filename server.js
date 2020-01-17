'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { User } = require('./models');
const { Booze } = require('./models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const reportsRouter = require('./report_features/reports');
const createUserRouter = require('./user_features/create_user');
const loginUserRouter = require('./user_features/login_user');
const inventoryRouter = require('./booze_features/inventory');
const boozePullRouter = require('./booze_features/booze_pull');
const addInventoryRouter = require('./booze_features/add_inventory');
const newBoozeRouter = require('./booze_features/new_booze');

mongoose.Promise = global.Promise;

const app = express();
app.use(cors({
	origin: 'https://booze-tracking.herokuapp.com'
}));
app.use(express.json());
app.use(express.static('public'));

app.use('/reports', reportsRouter);
app.use('/users', createUserRouter);
app.use('/users', loginUserRouter);
app.use('/booze', inventoryRouter);
app.use('/booze', boozePullRouter);
app.use('/booze', addInventoryRouter);
app.use('/booze', newBoozeRouter);


app.use("*", function(req, res) {
	res.status(404).json({ message: "not found" });
})


let server;

function runServer(DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(
			DATABASE_URL,
			err => {
				if (err) {
					return reject(err);
				}
				server = app
					.listen(process.env.PORT || 8080, () => {
						console.log(`Booze Tracking app is listening on port ${process.env.PORT || 8080}`);
						resolve();
					})
					.on("error", err => {
						mongoose.disconnect();
						reject(err);
					});
				}	
		);
		mongoose.connection.once('open', function callback () { console.log("connection successful"); });
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
    	return new Promise((resolve, reject) => {
      		console.log('Closing server');
      		server.close(err => {
        		if (err) {
          		return reject(err);
        		}
        		resolve();
      		});
    	});
  	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
} 


module.exports = { app, runServer, closeServer };

