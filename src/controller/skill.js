const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");
const Wilder = require("../entity/Wilder")

module.exports = {
  create: async (req, res) => {
    try {
      const skillToCreate = await dataSource
        .getRepository(Skill)
        .save(req.body)
      res.status(201).send("Created skill");
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while creating skill")
    }
  },
  read: async (req, res) => {
    try {
      const skillToRead = await dataSource
        .getRepository(Skill)
        .find()
      res.status(200).send(skillToRead);
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while reading skills")
    }
  },
  update: async (req, res) => {
    try {
      await dataSource
        .getRepository(Skill)
        .update(req.params.id, { name: req.body.name })
      res.status(200).send("Updated skill");
    } catch (err) {
      res.status(404).send("Error while updating skill")
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource
        .getRepository(Skill)
        .delete(parseInt(req.params.id))
      res.status(200).send("Deleted skill");
    } catch (err) {
      res.status(404).send("Error while deleting skill")
    }
  },
  addSkillToWilder: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: req.params.idWilder });
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: req.params.idSkill });
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.status(200).send("Skill added to wilder");
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while creating skill")
    }
  },
}