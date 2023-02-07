const mongoose = require("mongoose")

const AlbumSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    images:{
        type:[String],
    }
})

const Album = mongoose.model("album",AlbumSchema);
module.exports = Album;