const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    description: {
      type: "text",
    }
  },
  relations: {
    skills: {
      target: "Skill",
      type: "many-to-many",
      joinTable: true,
      eager: true,
    }
  }
});