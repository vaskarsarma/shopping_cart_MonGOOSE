const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);

// const fs = require('fs');
// const path = require('path');
// const Cart = require('../models/cart');
// const getDB = require('../util/database').GetDb;
// const mongoDB = require('mongodb');

// const p = path.join(
// 	path.dirname(process.mainModule.filename),
// 	'data',
// 	'products.json',
// );

// const getProductsFromFile = cb => {
// 	fs.readFile(p, (err, fileContent) => {
// 		if (err) {
// 			cb([]);
// 		} else {
// 			cb(JSON.parse(fileContent));
// 		}
// 	});
// };

// module.exports = class Product {
// 	constructor(title, imageUrl, description, price, id, userID) {
// 		this.title = title;
// 		this.imageUrl = imageUrl;
// 		this.description = description;
// 		this.price = price;
// 		this.id = id ? new mongoDB.ObjectID(id) : null;
// 		this.userID = userID;
// 	}

// 	save() {
// 		const db = getDB();
// 		console.log(db);
// 		let query = '';

// 		if (this.id) {
// 			query = db
// 				.collection('products')
// 				.updateOne({ _id: this.id }, { $set: this });
// 		} else {
// 			query = db.collection('products').insertOne(this);
// 		}

// 		return query
// 			.then(result => {
// 				console.log(result);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});

// 		// getProductsFromFile(products => {
// 		// 	if (this.id) {
// 		// 		const existingProductIndex = products.findIndex(p => p.id === this.id);
// 		// 		const updatedProducts = [...products];
// 		// 		updatedProducts[existingProductIndex] = this;
// 		// 		fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// 		// 			console.log(err);
// 		// 		});
// 		// 	} else {
// 		// 		this.id = Math.random().toString();
// 		// 		products.push(this);
// 		// 		fs.writeFile(p, JSON.stringify(products), err => {
// 		// 			console.log(err);
// 		// 		});
// 		// 	}
// 		// });
// 	}

// 	// edit(prodID) {
// 	// 	const db = getDB();
// 	// 	return db
// 	// 		.collection('products')
// 	// 		.updateOne({ _id: new mongoDB.ObjectID(prodID) }, { $set: this })
// 	// 		.then(result => {
// 	// 			console.log(result);
// 	// 		})
// 	// 		.catch(err => {
// 	// 			console.log(err);
// 	// 		});
// 	// }

// 	static deleteByID(id) {
// 		const db = getDB();
// 		return db
// 			.collection('products')
// 			.deleteOne({
// 				_id: new mongoDB.ObjectID(id),
// 			})
// 			.then(result => {
// 				console.log(result.deleteCount);
// 				return result;
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	// static deleteByID(id) {
// 	// 	getProductsFromFile(products => {
// 	// 		const product = products.find(p => p.id === id);
// 	// 		const updatedProducts = products.filter(p => p.id !== id);
// 	// 		fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// 	// 			if (!err) {
// 	// 				//Delete the product from CART
// 	// 				Cart.deleteFromCart(id, product.price);
// 	// 			}
// 	// 			console.log(err);
// 	// 		});
// 	// 	});
// 	// }

// 	static fetchAll() {
// 		const db = getDB();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then(products => {
// 				//console.log(products);
// 				return products;
// 			})
// 			.catch(err => {
// 				//console.log(err);
// 				return err;
// 			});
// 	}

// 	static findByID(id) {
// 		const db = getDB();
// 		return db
// 			.collection('products')
// 			.find({ _id: new mongoDB.ObjectId(id) })
// 			.next()
// 			.then(result => {
// 				//console.log(result);
// 				return result;
// 			})
// 			.catch(err => {
// 				return err;
// 			});
// 	}
// };
