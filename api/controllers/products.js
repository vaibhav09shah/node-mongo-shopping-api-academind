const mongoose = require('mongoose');
const Product = require('../models/products');

exports.get_all_products =  (req,res,next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            producs: docs
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });
    
}

exports.create_new_product = (req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage: req.file.path
    })

    product.save()
    .then(result => {
        res.status(201).json({
            message:'Created product Successfully',
            createdProduct: product
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    })
}

exports.get_products_details = (req,res,next) => {
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then( doc => {
            res.status(200).json(doc)
        }
    )
    .catch( err => {
        res.status(500).json({
            error:err
        })
    });
}

exports.update_product_details = (req,res,next) => {
    const id = req.params.productId;
    const updatedOps = {};
    for( const ops of req.body ){
        updatedOps[ops.propName] = ops.value;
    }
   
    Product.update({_id:id} ,{$set: updatedOps} )
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
    
}


exports.delete_product = (req,res,next) => {
    const id = req.params.productId
    Product.remove({_id:id}).exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch( err => {
        res.status(500).json({
            error:err
        })
    });
    
}