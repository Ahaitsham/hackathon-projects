import express from 'express'
import dotenv from 'dotenv'
import conntectToDb from './config/db.js';
import userRoutes from './routes/user.routes.js'

dotenv.config()
conntectToDb();

const app = express();


//tomorrow we will discuss this part in detail
app.use(express.json());
app.use(express.urlencoded({extended:true}))



// app.use(cors())



const PORT = 3000



// app.get('/api/health',(req,res)=>{
//     console.log("your todo api is running perfectly")
//     res.send("your todo api is running perfectly")
// })

app.use("/api/user",userRoutes)

app.get("/api/health",(req,res)=>{
    console.log("working fine")
    res.send("hello")
})


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