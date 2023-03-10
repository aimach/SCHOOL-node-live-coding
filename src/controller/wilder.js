const { dataSource } = require('../utils');
const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');

class WilderController {
  static async create(req, res) {
    try {
      const test = await dataSource
        .getRepository(Wilder)
        .count({ where: { email: req.body.email } });
      if (test > 0) {
        res.status(403).send('Email already exist');
      } else {
        const request = await dataSource.getRepository(Wilder).save(req.body);
        res.status(201).send({ id: request.id });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send('Error while creating wilder');
    }
  }

  static async read(req, res) {
    try {
      const WilderToRead = await dataSource
        .getRepository(Wilder)
        .find();
      res.status(200).send(WilderToRead);
    } catch (err) {
      console.log(err);
      res.status(400).send('Error while reading wilders');
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const existingUser = await dataSource.getRepository(Wilder).findOneBy({ id });
      if (existingUser === null) {
        return res.status(404).send('Wilder not found');
      }
      await dataSource
        .getRepository(Wilder)
        .update(req.params.id, { name: req.body.name });
      res.status(200).send('Updated wilder');
    } catch (err) {
      res.status(400).send('Error while updating wilder');
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const existingUser = await dataSource.getRepository(Wilder).findOneBy({ id });
      if (existingUser === null) {
        return res.status(404).send('Wilder not found');
      }
      await dataSource
        .getRepository(Wilder)
        .delete(parseInt(req.params.id, 10));
      return res.status(200).send('Deleted wilder');
    } catch (err) {
      return res.status(404).send('Error while deleting wilder');
    }
  }

  static async addSkillToWilder(req, res) {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: req.params.idWilder });
      if (!wilderToUpdate) {
        res.status(404).send('Wilder not found');
      }
      req.body.skills.forEach(async (e) => {
        const skillToAdd = await dataSource
          .getRepository(Skill)
          .findOneBy({ id: e });
        if (!skillToAdd) {
          res.status(404).send('Skill not found');
        }
        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      });
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.status(200).send('Skill added to wilder');
    } catch (err) {
      console.log(err);
      res.status(404).send('Error while creating skill');
    }
  }
}

module.exports = WilderController;
