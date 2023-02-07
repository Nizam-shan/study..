const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    photo:{
       data:Buffer,
        type:String
    },
    birthday:{
        type:String
    }
});

const Image = mongoose.model('Image',ImageSchema);
module.exports = Image;