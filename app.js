// imports
const express = require("express");

// routes
const projectsApiRoutes = require("./projects/projectsRouter");

// constants
const app = express();
const port = 8000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello API");
});

// USE the routes
app.use("/api/projects", projectsApiRoutes);

app.post("/test", (req, res) => {
  console.log(req.body.name);
  res.send("test");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
