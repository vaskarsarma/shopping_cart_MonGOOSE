// const getDB = require('../util/database').GetDb;
// const mongoDb = require('mongodb');

// module.exports = class User {
// 	constructor(username, email, cart, _id) {
// 		this.name = username;
// 		this.email = email;
// 		this.cart = cart;
// 		this._id = _id;
// 	}

// 	save() {
// 		const db = getDB();
// 		return db
// 			.collection('users')
// 			.insertOne(this)
// 			.then(result => {
// 				console.log(result);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	addToCart(product) {
// 		console.log(product);

// 		let existingCartItemIndex = -1;
// 		let updatedCartIetms = [];

// 		if (this.cart && this.cart.items) {
// 			existingCartItemIndex = this.cart.items.findIndex(cp => {
// 				return cp.productId.toString() === product._id.toString();
// 			});

// 			updatedCartIetms = [...this.cart.items];
// 		}

// 		let newQuantity = 1;

// 		if (existingCartItemIndex >= 0) {
// 			newQuantity = this.cart.items[existingCartItemIndex].quantity + 1;
// 			updatedCartIetms[existingCartItemIndex].quantity = newQuantity;
// 		} else {
// 			updatedCartIetms.push({
// 				productId: new mongoDb.ObjectId(product._id),
// 				quantity: newQuantity,
// 			});
// 		}

// 		const updatedCart = {
// 			items: updatedCartIetms,
// 		};

// 		const db = getDB();

// 		return db
// 			.collection('users')
// 			.updateOne(
// 				{ _id: new mongoDb.ObjectId(this._id) },
// 				{ $set: { cart: updatedCart } },
// 			)
// 			.then(result => {
// 				console.log(result);
// 				//return result;
// 			})
// 			.catch(err => {
// 				//console.log(err);
// 				return err;
// 			});
// 	}

// 	getCart() {
// 		const db = getDB();

// 		const productIDs = this.cart.items.map(p => {
// 			return new mongoDb.ObjectId(p.productId);
// 		});

// 		return db
// 			.collection('products')
// 			.find({ _id: { $in: productIDs } })
// 			.toArray()
// 			.then(results => {
// 				return results.map(p => {
// 					return {
// 						...p,
// 						quantity: this.cart.items.find(
// 							c => c.productId.toString() === p._id.toString(),
// 						).quantity,
// 					};
// 				});
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	syncCartItemsWithProduct() {
// 		const productIDs = this.cart.items.map(p => {
// 			return new mongoDb.ObjectId(p.productId);
// 		});

// 		const db = getDB();

// 		return db
// 			.collection('products')
// 			.find({ _id: { $in: productIDs } })
// 			.toArray()
// 			.then(results => {
// 				return results.map(p => {
// 					return this.cart.items.find(
// 						c => c.productId.toString() === p._id.toString(),
// 					);
// 				});
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	updateCartItems(updatedCartItems) {
// 		const db = getDB();

// 		return db
// 			.collection('users')
// 			.updateOne(
// 				{
// 					_id: new mongoDb.ObjectID(this._id),
// 				},
// 				{
// 					$set: {
// 						cart: {
// 							items: updatedCartItems,
// 						},
// 					},
// 				},
// 			)
// 			.then(result => {
// 				console.log(result);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	deleteProductFromCart(productid) {
// 		console.log(productid);

// 		const updatedCarItems = this.cart.items.filter(
// 			cp => cp.productId.toString() !== productid.toString(),
// 		);

// 		const db = getDB();

// 		return db
// 			.collection('users')
// 			.updateOne(
// 				{
// 					_id: new mongoDb.ObjectID(this._id),
// 				},
// 				{
// 					$set: {
// 						cart: {
// 							items: updatedCarItems,
// 						},
// 					},
// 				},
// 			)
// 			.then(result => {
// 				console.log(result);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	}

// 	addOrder() {
// 		const db = getDB();

// 		return this.getCart()
// 			.then(products => {
// 				return db
// 					.collection('orders')
// 					.insertOne({
// 						user: { _id: this._id, name: this.name },
// 						items: products,
// 					})
// 					.then(() => {
// 						return db
// 							.collection('users')
// 							.updateOne(
// 								{ _id: new mongoDb.ObjectID(this._id) },
// 								{ $set: { cart: { items: [] } } },
// 							)
// 							.then(results => {
// 								return results;
// 							})
// 							.catch(err => {
// 								return err;
// 							});
// 					})
// 					.catch(err => {
// 						return err;
// 					});
// 			})
// 			.catch(err => {
// 				return err;
// 			});
// 	}

// 	getOrders() {
// 		const db = getDB();

// 		return db
// 			.collection('orders')
// 			.find({ 'user._id': new mongoDb.ObjectID(this._id) })
// 			.toArray()
// 			.then(results => {
// 				console.log(results);
// 				return results;
// 			})
// 			.catch(err => {
// 				console.log(err);
// 				return err;
// 			});
// 	}

// 	static findUserByID(userID) {
// 		const db = getDB();
// 		return db
// 			.collection('users')
// 			.findOne({ _id: new mongoDb.ObjectID(userID) })
// 			.then(result => {
// 				console.log(result);
// 				return result;
// 			})
// 			.catch(err => {
// 				console.log(err);
// 				return err;
// 			});
// 	}
// };
