const Product = require('../models/product');
// const Cart = require('../models/cart');
// const User = require('../models/user');

const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
	Product.find()
		.then(products => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'All Products',
				path: '/products',
			});
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.getProduct = (req, res, next) => {
	const prodID = req.params.productid;
	//console.log(prodID);
	Product.findById(prodID)
		.then(product => {
			res.render('shop/product-detail', {
				product: product,
				pageTitle: product.title,
				path: '/products',
			});
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.getIndex = (req, res, next) => {
	Product.find()
		.then(products => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {
			const results = user.cart.items;
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
				products: results,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCard = (req, res, next) => {
	const prodID = req.body.productid;
	console.log(prodID);
	Product.findById(prodID)
		.then(product => {
			return req.user
				.addToCart(product)
				.then(() => {
					res.redirect('/cart');
				})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.deleteProductFromCart = (req, res, next) => {
	const prodID = req.body.productid;

	req.user
		.deleteProductFromCart(prodID)
		.then(result => {
			res.redirect('/cart');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	Order.find({ 'user.userId': req.user._id })
		.then(orders => {
			//console.log(orders);
			res.render('shop/orders', {
				path: '/orders',
				pageTitle: 'Your Orders',
				orders: orders,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.addOrder = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {
			//console.log(user.cart.items);
			const products = user.cart.items.map(p => {
				return {
					product: { ...p.productId._doc },
					quantity: p.quantity,
				};
			});
			const order = new Order({
				user: {
					userId: req.user,
					name: req.user.name,
				},
				products: products,
			});
			order.save();
		})
		.then(() => {
			req.user
				.clearCart()
				.then(result => {
					res.redirect('/orders');
				})
				.catch(err => {
					res.redirect('/');
				});
		})
		.catch(err => {
			res.redirect('/');
		});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};
