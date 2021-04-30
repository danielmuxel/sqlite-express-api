const projectsModel = require("./projectsModel");

const index = (req, res) => {
  projectsModel
    .getProjects()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const create = async (req, res) => {
  let newProject = {
    name: req.body.name,
  };

  projectsModel
    .createProject(newProject)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { index, create };
