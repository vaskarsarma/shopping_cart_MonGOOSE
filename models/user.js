const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		required: true,
	},
	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
});

userSchema.methods.addToCart = function(product) {
	console.log(product);

	let existingCartItemIndex = -1;
	let updatedCartIetms = [];

	if (this.cart && this.cart.items) {
		existingCartItemIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});

		updatedCartIetms = [...this.cart.items];
	}

	let newQuantity = 1;

	if (existingCartItemIndex >= 0) {
		newQuantity = this.cart.items[existingCartItemIndex].quantity + 1;
		updatedCartIetms[existingCartItemIndex].quantity = newQuantity;
	} else {
		updatedCartIetms.push({
			productId: product._id,
			quantity: newQuantity,
		});
	}

	const updatedCart = {
		items: updatedCartIetms,
	};
	this.cart = updatedCart;
	return this.save();
};

userSchema.methods.clearCart = function() {
	const updatedCart = {
		items: [],
	};
	this.cart = updatedCart;
	return this.save();
};

userSchema.methods.deleteProductFromCart = function(prodID) {
	console.log(prodID);

	const updatedCartIetms = this.cart.items.filter(
		cp => cp.productId.toString() !== prodID.toString(),
	);

	const updatedCart = {
		items: updatedCartIetms,
	};

	this.cart = updatedCart;
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
