const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
// For Image Upload
const multer = require('multer');

// Importing Controller
const ProductController = require('../controllers/products');

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, Date.now()+'_'+file.originalname );
        }
    }
);

const fileFilter = (req,file,cb) => {
    // Reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null,true); // This will accept  file
    } else {
        cb(null,false); // This will reject file
    }
    
    
}

// File Upload Configurations
const upload = multer({ 
    storage: storage , 
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
});


const Product = require('../models/products');

router.get('/', ProductController.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), ProductController.create_new_product);

router.get('/:productId', ProductController.get_products_details);

router.patch('/:productId', checkAuth,);

router.delete('/:productId', checkAuth, ProductController.delete_product);

module.exports = router;