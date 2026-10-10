import express from 'express'
import dotenv from 'dotenv'
import conntectToDb from './config/db.js';
import { logic } from './controllers/logic.js';
dotenv.config()
conntectToDb();


const app = express();


//tomorrow we will discuss this part in detail
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// app.use(cors())



const PORT = process.env.PORT || 8080

app.get("/",logic)

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})


// Notes


// function name(){
//     console.log("ahaitsham")
// }

// arrow fn
// const arrowFn =()=> {
    
// }