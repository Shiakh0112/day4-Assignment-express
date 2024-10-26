const express = require("express");
const path = require("path");
const App = express();
const PORT = 3000;
const fs = require("fs");
App.use(express.static(path.join(__dirname, "public")));
App.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));
});
App.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

App.get("/contact", (req, res) => {
  const filePath = path.join(__dirname, "public", "contect.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).join({ error: "failed to read json file" });
    }

    res.json(JSON.parse(data));
  });
});

App.get("/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.sendFile(path.join(__dirname, "public", "random.html"));
});
App.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
App.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
