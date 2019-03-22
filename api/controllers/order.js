const Order    = require('../models/orders');
const Product  = require('../models/products');
const mongoose = require('mongoose');

exports.order_get_all = (req,res,next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product','name price')
    .exec()
    .then( docs => {
        console.log(docs);
        res.status(200).json({
            count:docs.length,
            orders: docs.map (doc => {
                return {
                    _id:doc._id,
                    product: doc.product,
                    quantity:doc.quantity,
                    request:{}
                }
            })
        });
    })
    .catch( err => {
        console.log(error);
        res.status(500).json({
            error:err
        })
    });
}

exports.orders_create_order = (req,res,next) => {

    Product.findById(req.body.productId)
        .then( product => {
            console.log(product);
            if(!product) {
                return res.status(400).json({
                    message:"Product Not Found"
                })
            }
            const order = new Order({
                _id:new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
        
            return order.save();
        })
        .then( result => {
        
            res.status(201).json({
                message:'Order Created',
                createdOrder:{
                    id:result._id,
                    product:result.product,
                    quantity:result.quantity
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

}

exports.get_order_details = (req,res,next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then( order => {
        res.status(200).json({
            order:order,
            request:{

            }
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
}

exports.delete_order_id =  (req,res,next) => {
    Order.remove({ _id:req.params.orderId })
    .exec()
    .then( result => {
        res.status(200).json({
            message:'Order Deleted',
            request:{
 
            }
        })
    })
    .catch( err => {
         res.status(500).json({
             error:err
         })
    });
 }