const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const MongooseConnect = require('./util/database').MongooseConnect;

//const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
// 	User.findUserByID('5f37c381811027c0c47bbba2')
// 		.then(user => {
// 			req.user = new User(user.name, user.email, user.cart, user._id);
// 			next();
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// });

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

MongooseConnect(() => {
	app.listen(3000, () => {
		console.log(`Server started on 3000`);
	});
});
