const projectsModel = require("./projectsModel");

const index = (req, res) => {
  projectsModel
    .getProjects()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const create = async (req, res) => {
  let newProject = {
    name: req.body.name,
  };

  projectsModel
    .createProject(newProject)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const detail = async (req, res) => {
  projectsModel
    .getProject(req.params.projects_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const update = async (req, res) => {
  let updatedProject = {
    name: req.body.name,
    id: req.params.projects_id,
  };

  projectsModel
    .updateProject(updatedProject)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const del = async (req, res) => {
  projectsModel
    .deleteProject(req.params.projects_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { index, create, detail, update, del };
