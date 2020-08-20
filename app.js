const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const MongooseConnect = require('./util/database').MongooseConnect;

const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('5f3e1c13dea3f84f8c79af23')
		.then(user => {
			console.log(user);
			req.user = user;
			next();
		})
		.catch(err => {
			console.log(err);
		});
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

MongooseConnect(() => {
	User.findOne().then(u => {
		if (!u) {
			const user = new User({
				name: 'Vaskar Sarma',
				email: 'vaskar@test.com',
				cart: {
					items: [],
				},
			});
			user.save();
		}
	});

	app.listen(3000, () => {
		console.log(`Server started on 3000`);
	});
});
