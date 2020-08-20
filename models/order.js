const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
	user: {
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
	},
	products: [
		{
			product: {
				type: Object,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model('Order', orderSchema);
