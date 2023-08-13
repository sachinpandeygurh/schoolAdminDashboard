const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        trim: true
    },
    publicId:{
        type : String,
    },
    imageUrl:{
        type:String,
        require:false
    }
},{timestamps:true})

module.exports=mongoose.model("user" , userSchema);