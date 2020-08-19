const Product = require('../models/product');
// const Cart = require('../models/cart');
// const User = require('../models/user');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
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
	console.log(prodID);
	Product.findByID(prodID)
		.then(product => {
			//console.log('get by ID');
			//console.log(product);
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
	Product.fetchAll()
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
		.syncCartItemsWithProduct()
		.then(updatedCartItems => {
			req.user
				.updateCartItems(updatedCartItems)
				.then(result => {
					req.user
						.getCart()
						.then(results => {
							//console.log(results);
							res.render('shop/cart', {
								path: '/cart',
								pageTitle: 'Your Cart',
								products: results,
							});
						})
						.catch(err => {
							console.log(err);
						});
				})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postCard = (req, res, next) => {
	const prodID = req.body.productid;
	console.log(prodID);
	Product.findByID(prodID)
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
			//console.log(result);
			res.redirect('/cart');
		})
		.catch(err => {
			console.log(err);
		});

	// Product.findByID(prodID, product => {
	// 	if (product) {
	// 		//console.log(product);
	// 		Cart.deleteFromCart(prodID, product.price);
	// 		res.redirect('/cart');
	// 	} else {
	// 		res.redirect('/');
	// 	}
	// });
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then(orders => {
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
		.addOrder()
		.then(result => {
			//console.log(res);
			res.redirect('/orders');
		})
		.catch(err => {
			//console.log(err);
			res.redirect('/');
		});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};
