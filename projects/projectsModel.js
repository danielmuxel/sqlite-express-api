const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/data.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id integer PRIMARY KEY NOT NULL,
    name text NOT NULL
  );`);
});

// https://www.sqlitetutorial.net/sqlite-insert/
const createProject = (project) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(`
      INSERT INTO projects
      (name)
      VALUES(?);
      `);
      // function instead of arrow function because of this
      // this is now representing the object that runs the function not the owner
      stmt.run(project.name, function (err) {
        if (err) {
          console.error(err);
          return reject(err);
        }

        project.id = this.lastID;
        resolve(project);
      });
      stmt.finalize();
    });
  });
};

// https://www.sqlitetutorial.net/sqlite-select/
const getProjects = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let sql = `SELECT * FROM projects`;
      db.all(sql, (err, rows) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(rows);
      });
    });
  });
};

// https://www.sqlitetutorial.net/sqlite-select/
const getProject = (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let sql = `SELECT * FROM projects WHERE id = ?;`;
      db.get(sql, id, (err, rows) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(rows);
      });
    });
  });
};

// https://www.sqlitetutorial.net/sqlite-update/
const updateProject = (project) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let sql = `UPDATE projects 
      SET name = ?
      WHERE id = ?;`;
      db.get(sql, project.name, project.id, (err, row) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(row);
      });
    });
  });
};

// https://www.sqlitetutorial.net/sqlite-delete/
const deleteProject = (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(`DELETE FROM projects 
      WHERE id = ?;`);
      stmt.run(id, (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(id);
        resolve(id);
      });
      stmt.finalize();
    });
  });
};

// export it all
module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
