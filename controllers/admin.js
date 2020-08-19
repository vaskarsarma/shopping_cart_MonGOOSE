const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		edit: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({
		title: title,
		description: description,
		price: price,
		imageUrl: imageUrl,
	});
	product
		.save()
		.then(() => {
			console.log('Product Added');
			res.redirect('/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const prodID = req.params.productid;
	const editmode = req.query.edit ? true : false;

	if (!editmode) return res.redirect('/');

	console.log(prodID);

	Product.findByID(prodID)
		.then(product => {
			if (!product) {
				res.redirect('/');
			}
			res.render('admin/edit-product', {
				product: product,
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				edit: editmode,
			});
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.postEditProduct = (req, res, next) => {
	const prodID = req.body.productid;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;

	const product = new Product(
		title,
		imageUrl,
		description,
		price,
		prodID,
		req.user._id,
	);
	product
		.save()
		.then(result => {
			console.log(result);
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const prodID = req.body.productid;
	Product.deleteByID(prodID)
		.then(result => {
			console.log('Data deleted');
			console.log(result);
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(products => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch(err => {
			console.log(err);
		});
};
