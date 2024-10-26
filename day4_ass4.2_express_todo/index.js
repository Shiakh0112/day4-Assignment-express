const express = require("express");
const app = express();
const fs = require("fs");
const TodoFiles = "./db.json";
app.use(express.json());

const readTodo = () => {
  const data = fs.readFileSync(TodoFiles, "utf-8");
  return JSON.parse(data);
};
const writeTodoData = (data) => {
  fs.writeFileSync(TodoFiles, JSON.stringify(data, null, 2));
};

app.post("/todo", (req, res) => {
  const { task, status } = req.body;
  if (!task || typeof status != "boolean") {
    return res.status(400).json({ message: "Task not found" });
  }
  const data = readTodo();

  const newId = data.todos;

  const mainId = newId ? newId[newId.length - 1].id + 1 : 1;
  console.log("kokm", mainId);

  const newTodo = { id: mainId, task, status };

  data.todos.push(newTodo);
  writeTodoData(data);

  res.status(200).json(newTodo);
});
app.get("/todo", (req, res) => {
  const data = readTodo();
  res.status(200).json(data.todos);
});
app.put("/todo/even", (req, res) => {
  const data = readTodo();
  let updateTodoData = data.todos.map((todo) => {
    if (todo.id % 2 === 0 && !todo.status) {
      todo.status = true;
    }
    console.log(todo);
    return todo;
  });
  data.todos.todos = updateTodoData;
  writeTodoData(data);
  res.status(200).json({ message: "Data Updated successfully" });
});
app.delete("/todo", (req, res) => {
  // Read the current todo data
  const data = readTodo();

  // Check if 'todos' exists and is an array
  if (data && Array.isArray(data.todos)) {
    // Filter out completed todos
    data.todos = data.todos.filter((todo) => !todo.status);

    // Write the updated data back to db.json
    writeTodoData(data);
    res.status(200).json({ message: "Data deleted successfully" });
  } else {
    res
      .status(500)
      .json({ message: "Failed to delete todos: Invalid data structure." });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
// Prashant@masaischool.com
