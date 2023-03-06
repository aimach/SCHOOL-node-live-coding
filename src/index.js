const express = require("express");
const dataSource = require("./utils").dataSource;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server stated on 3000"));
};

start();