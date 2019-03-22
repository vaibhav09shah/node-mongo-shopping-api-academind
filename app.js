const express = require('express');
const app     = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Including DotENV Config
require('dotenv').config();

// Importing Routes
const productRoutes = require('./api/routes/products');
const orderRoutes   = require('./api/routes/orders');
const userRoutes    = require('./api/routes/user');

mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds213896.mlab.com:13896/academind-node-shop-api' ,{ useNewUrlParser: true } )
        .then( () => console.log('Connection Successful'))
        .catch((error) => console.log(error));

app.use(morgan('dev')); // Morgan is used for logging logs
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers','Origin , X-Requested-with, Content-Type, Accept , Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT , POST, PATCH, DELETE , GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);


// app.use((req,res,next) => {
//     res.status(200).json({
//         message:'Welcome to Node API'
//     })
// });


app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;