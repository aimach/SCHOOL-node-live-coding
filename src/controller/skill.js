const { dataSource } = require('../utils');
const Skill = require('../entity/Skill');

class SkillController {
  static async create(req, res) {
    try {
      await dataSource
        .getRepository(Skill)
        .save(req.body);
      res.status(201).send('Created skill');
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(409).send('Skill already exists');
      }
      return res.status(400).send('Something went wrong');
    }
  }

  static async read(req, res) {
    try {
      const skillToRead = await dataSource
        .getRepository(Skill)
        .find();
      res.status(200).send(skillToRead);
    } catch (err) {
      console.error('error', err);
      res.status(400).send('Error while reading skills');
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const existingSkill = await dataSource.getRepository(Skill).findOneBy({ id });
      if (existingSkill === null) {
        return res.status(404).send('Skill not found');
      }
      await dataSource
        .getRepository(Skill)
        .update(id, { name: req.body.name });
      res.status(200).send('Updated skill');
    } catch (err) {
      res.status(400).send('Error while updating skill');
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existingSkill = await dataSource.getRepository(Skill).findOneBy({ id });
      if (existingSkill === null) {
        return res.status(404).send('Skill not found');
      }
      await dataSource
        .getRepository(Skill)
        .delete(parseInt(req.params.id, 10));
      res.status(200).send('Deleted skill');
    } catch (err) {
      res.status(400).send('Error while deleting skill');
    }
  }
}

module.exports = SkillController;
