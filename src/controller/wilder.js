const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
  create: async (req, res) => {
    let status;
    let message;
    try {
      const test = await dataSource
        .getRepository(Wilder)
        .count({ where: { email: req.body.email } })
      if (test > 0) {
        status = 403;
        message = "Email already exist";
      } else {
        await dataSource.getRepository(Wilder).save(req.body);
        status = 201;
        message = "Created wilder";
      }
      res.status(status).send(message);
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while creating wilder")
    }
  },
  read: async (req, res) => {
    try {
      const WilderToRead = await dataSource
        .getRepository(Wilder)
        .find()
      res.status(200).send(WilderToRead);
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while reading wilders")
    }
  },
  update: async (req, res) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update(req.params.id, { name: req.body.name })
      res.status(200).send("Updated wilder");
    } catch (err) {
      res.status(404).send("Error while updating wilder")
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .delete(parseInt(req.params.id))
      res.status(200).send("Deleted wilder");
    } catch (err) {
      res.status(404).send("Error while deleting wilder")
    }
  },
}