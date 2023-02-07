const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confPassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password ,12);
        this.confPassword = await bcrypt.hash(this.confPassword,12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function  ()  {
  try{
    const token =  jwt.sign({id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
}

const User = mongoose.model('user',userSchema);
module.exports = User;