const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      const skillToCreate = await dataSource
        .getRepository(Skill)
        .save(req.body)
        .then(() => {
          res.send("Created skill");
        })
    } catch (err) {
      console.log(err);
      res.send("Error while creating skill")
    }
  },
  read: async (req, res) => {
    try {
      const skillToRead = await dataSource
        .getRepository(Skill)
        .find()
        .then((data) => {
          res.send(data);
        })
    } catch (err) {
      console.log(err);
      res.send("Error while reading skills")
    }
  },
  update: async (req, res) => {
    try {
      const skillToUpdate = await dataSource
        .getRepository(Skill)
        .update(req.params.id, { name: req.body.name })
        .then(() => {
          res.send("Updated skill");
        })
    } catch (err) {
      res.send("Error while updating skill")
    }
  },
  delete: async (req, res) => {
    try {
      const skillToDelete = await dataSource
        .getRepository(Skill)
        .delete(parseInt(req.params.id))
        .then(() => {
          res.send("Deleted skill");
        })
    } catch (err) {
      res.send("Error while deleting skill")
    }
  },
}