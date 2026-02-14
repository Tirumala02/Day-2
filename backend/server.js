const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // middleware to read JSON

const cors = require("cors");
app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// 🔹 Connect to MongoDB
mongoose.connect("")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔹 Create Todo Schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

// 🔹 Create Model
const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
    res.send("Server Working");
  });
// 🔹 CREATE Todo
app.post("/todos", async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

// 🔹 GET All Todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// 🔹 UPDATE Todo
app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(updatedTodo);
});

// 🔹 DELETE Todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo Deleted" });
});

// 🔹 Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
