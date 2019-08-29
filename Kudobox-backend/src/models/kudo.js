const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Kudo = new Schema({
    imageString: {
        type: String
    },    
    createdOn: {
        type: Date 
    },    
    createdBy: {
        type: String
    },
    receiver:{
        type: String
    }   
});

Kudo.pre('save',function(next){
    this.createdOn = new Date();
    next();
});
module.exports = mongoose.model('Kudo', Kudo);