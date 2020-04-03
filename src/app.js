const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
//importing routes
const customerRoutes = require('./routes/customer')

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'username',
    password: '',
    port: 3306,
    database: 'crudnodejsmysql',
}, 'single'));
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', customerRoutes);


//statics files
app.use(express.static(path.join(__dirname, 'public')))

//starting the server
app.listen(3000, () => {
    console.log('SERVER ON PORT 3000');
});