const mongoose = require('mongoose');


const StudySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    image:{
        type:String,
    }
})

const Study = mongoose.model("Study",StudySchema);
module.export = Study;