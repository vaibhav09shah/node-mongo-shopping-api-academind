const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   email:{ 
       type: String, 
       required: true, 
       unique: true, 
       match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
   password: {type: String , required: true}
})

module.exports = mongoose.model('user',userScehma);