const mongoose = require('mongoose');

const url =
	'mongodb+srv://vaskartest:Q8IDHIa7KzMak1Wi@testvaskar.u4d65.mongodb.net/shop-2?retryWrites=true&w=majority';

const mongooseConnect = cb => {
	mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(res => {
			console.log('DB Connected using Mongoose');
			cb();
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.MongooseConnect = mongooseConnect;
