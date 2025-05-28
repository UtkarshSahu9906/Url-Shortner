const { Timestamp } = require("bson");
const mongoose =require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        require:true,
    },
    visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true})

const Url = mongoose.model('urlShortner',urlSchema);

module.exports = Url;