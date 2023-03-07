const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  let randomNb = Math.floor(Math.random() * 3);
  if (randomNb === 2) {
    console.log(req.socket.remoteAddress)
    res.status(418).send("I'm a teapot");
  } else {
    next();
  }
});

//wilder
app.get("/api/wilder", wilderController.read);
app.post("/api/wilder", wilderController.create);
app.put("/api/wilder/:id", wilderController.update);
app.delete("/api/wilder/:id", wilderController.delete);

//skill
app.get("/api/skill", skillController.read);
app.post("/api/skill", skillController.create);
app.post("/api/skill/:idWilder/:idSkill", skillController.addSkillToWilder);
app.put("/api/skill/:id", skillController.update);
app.delete("/api/skill/:id", skillController.delete);

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));
};

start();