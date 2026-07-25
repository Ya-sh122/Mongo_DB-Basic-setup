const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Dummy Logged In User
app.use((req, res, next) => {
    User.findById('YOUR_USER_ID_HERE')
        .then(user => {
            req.user = new User(
                user.username,
                user.email,
                user.cart,
                user._id
            );
            next();
        })
        .catch(err => console.log(err));
});

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Server Running on Port 3000');
    });
});