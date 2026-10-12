import { Todo } from "../models/todo.model.js";

export const getTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const todos = await Todo.find({ user: userId });

    console.log(todos);
    if (!todos) {
      return res.status(404).json({
        message: "No todo found",
        success: false,
      });
    }

    return res.status(200).json({
      todos,
      success: true,
    });
  } catch (error) {}
};

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(401).json({
        message: "something is missing",
        success: false,
      });
    }

    const userId = req.user.id;

    if (!userId) {
      return res.status(501).json({
        message: "Unauthorised user",
        success: false,
      });
    }

    const newTodo = await Todo.create({
      title,
      description,
      user: userId,
    });

    return res.status(200).json({
      message: "Todo created successfully",
      newTodo,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "todo can't be created at this moment",
      success: false,
    });

    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const {title,description} = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id,{
        title,
        description
    })


    return res.status(200).json({
        message:"Todo updated successfully",
        updateTodo,
        success:true
    })
    // console.log(id);
  } catch (error) {
    return res.status(401).json({
        message:"Todo can't be updated at this moment",
        success:false
    })

    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {

    try {
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        return res.status(200).json({
            message:"deleted successfully",
            success:true
        })
        
    } catch (error) {
        return res.status(401).json({
            message:"can't be deleted",
            success:false
        })

        console.log(error)
    }
};
