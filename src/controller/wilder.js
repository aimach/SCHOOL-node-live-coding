const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
  create: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.status(200).send("Created wilder");
      })
      .catch(() => {
        res.send("Error while creating wilder")
      })
  },
  read: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(404).send("Error while reading wilders")
      })
  },
  update: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .update(req.params.id, { name: req.body.name })
      .then(() => {
        res.send("Updated wilder");
      })
      .catch(() => {
        res.status(404).send("Error while updating wilder")
      })
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