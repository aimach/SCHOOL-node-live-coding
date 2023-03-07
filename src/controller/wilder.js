const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
  create: async (req, res) => {
    try {
      const wilderToCreate = await dataSource
        .getRepository(Wilder)
        .save(req.body)
        .then(() => {
          res.status(201).send("Created wilder");
        })
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
        .then((data) => {
          res.status(200).send(data);
        })
    } catch (err) {
      console.log(err);
      res.status(404).send("Error while reading wilders")
    }
  },
  update: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .update(req.params.id, { name: req.body.name })
        .then(() => {
          res.status(200).send("Updated wilder");
        })
    } catch (err) {
      res.status(404).send("Error while updating wilder")
    }
  },
  delete: async (req, res) => {
    try {
      const wilderToDelete = await dataSource
        .getRepository(Wilder)
        .delete(parseInt(req.params.id))
        .then(() => {
          res.status(200).send("Deleted wilder");
        })
    } catch (err) {
      res.status(404).send("Error while deleting wilder")
    }
  },
  delete: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .delete(parseInt(req.params.id))
      .then(() => {
        res.send("Deleted wilder");
      })
      .catch(() => {
        res.status(404).send("Error while deleting wilder")
      })
  },
}