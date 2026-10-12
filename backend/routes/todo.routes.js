import { Router } from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/middleware.js";


const router = Router();
// router.use(authMiddleware)

router.get("/",authMiddleware,getTodo)
router.post("/create",authMiddleware,createTodo)
router.patch("/update/:id",authMiddleware,updateTodo)
router.delete("/delete/:id",authMiddleware,deleteTodo)

export default router;


// these are our endpoint which we are going to use in our frontend wala part. 

// https://localhost:3000/api/user/register
// https://localhost:3000/api/user/login
// https://localhost:3000/api/user/logout
// https://localhost:3000/api/todo/create
// https://localhost:3000/api/todo/delete
// https://localhost:3000/api/todo/get
// https://localhost:3000/api/todo/update
