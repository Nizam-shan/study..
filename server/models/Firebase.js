const mongoose = require('mongoose');

const FirebaseSchema = new mongoose.Schema({
    name:{type:String,required:true},
    artist:{type:String,required:true},
    song:{type:String,required:true},
    img:{type:String,required:true},
});

const FireBase = mongoose.model("Fire",FirebaseSchema);
module.exports = FireBase;