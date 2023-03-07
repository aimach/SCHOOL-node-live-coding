const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();

app.use(express.json());

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