import mongoose from "mongoose";
import { User } from "./user.model.js";


const todoSchema = mongoose.Schema({
    title:{
        type:'String',
        required:true,
    },
    description:{
        type:'String',
    },
    isCompleted:{
        type:'Boolean',
        default:false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})


export const Todo = mongoose.model('Todo',todoSchema)