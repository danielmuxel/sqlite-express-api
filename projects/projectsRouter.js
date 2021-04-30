const router = require("express").Router();
const projectsController = require("./projectsController");

router.route("/").get(projectsController.index).post(projectsController.create);

// router
//   .route("/:projects_id")
//   .get(projectsController.detail)
//   .patch(projectsController.update)
//   .put(projectsController.update)
//   .delete(projectsController.delete);

module.exports = router;
