const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({user : req.userId});
  res.status(200).json(todos);
});

const setTodo = asyncHandler(async (req, res) => {
  if(!req.userId){
    res.status(400);
    throw new Error("User Id is missing");
  }
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const todo = await Todo.create({
    user: req.userId,
    text: req.body.text,
  });
  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
 
  const user = await User.findById(req.userId);
  
  // Getting user 
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const todo = await Todo.findById(req.params.id);
  
 
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  if(todo.user.toString() !== user.id){
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  if(todo.user.toString() !== user.id){
    res.status(401);
    throw new Error("User not authorized");
  }
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
};
