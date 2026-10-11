import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
    
},{
    timestamps:true
})


export const User = mongoose.model('User',userSchema);


