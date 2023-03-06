const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
  create: (req, res) => {
    dataSource
      .getRepository(Skill)
      .save(req.body)
      .then(() => {
        res.send("Created skill");
      })
      .catch(() => {
        res.send("Error while creating skill")
      })
  },
  read: (req, res) => {
    dataSource
      .getRepository(Skill)
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.send("Error while reading skills")
      })
  },
  update: (req, res) => {
    dataSource
      .getRepository(Skill)
      .update(req.params.id, { name: req.body.name })
      .then(() => {
        res.send("Updated skill");
      })
      .catch(() => {
        res.send("Error while updating skill")
      })
  },
  delete: (req, res) => {
    dataSource
      .getRepository(Skill)
      .delete(parseInt(req.params.id))
      .then(() => {
        res.send("Deleted skill");
      })
      .catch(() => {
        res.send("Error while deleting skill")
      })
  },
}