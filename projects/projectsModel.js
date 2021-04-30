const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id integer PRIMARY KEY NOT NULL,
    name text NOT NULL
  )`);
});

// db.close();

const createProject = (project) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const stmt = db.prepare(`
      INSERT INTO projects
      (name)
      VALUES(?);
      `);
      stmt.run(project.name, (err) => {
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

const getProjects = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let sql = `SELECT * FROM projects`;
      db.all(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  });
};

module.exports = { createProject, getProjects };
