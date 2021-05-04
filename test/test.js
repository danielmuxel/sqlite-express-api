const axios = require("axios");
const fs = require("fs");

const url = "http://localhost:8000/api/projects";

setTimeout(() => {
  testRoutine();
}, 2000);

let projects = [];
let log = "";
const testRoutine = async () => {
  addLog("### TEST STARTED");
  await testCreateProjects();
  await testGetProjects();
  await testUpdateProjects();
  await testGetProjects();
  await testDetailProjects();
  await testDeleteProjects();
  await testGetProjects();
  addLog("### TEST FINISHED");

  addToLogFile("./test/test.log", log);
};

const testGetProjects = async () => {
  addLog("## Test GET Projects STARTED");
  try {
    result = await axios.get(url);
    addLog(result.data);
    return result.data;
  } catch (err) {
    console.error(err.message);
  }
  addLog("## Test GET Projects FINISHED");
};

testCreateProjects = async () => {
  addLog("## Test Create (POST) Projects STARTED");
  try {
    for (let i = 0; i < 10; i++) {
      let time = +new Date() + i * 200;
      let result = await axios.post(url, {
        name: "Test Projekt " + time,
      });

      addLog(result.data);
      projects.push(result.data);
    }
  } catch (err) {
    console.error(err.message);
  }
  addLog("## Test Create (POST) Projects FINISHED");
};

testUpdateProjects = async () => {
  addLog("## Test Update (PUT) Projects STARTED");
  try {
    for (let i = 0; i < projects.length; i += 2) {
      const project = projects[i];
      project.name = "Updated " + project.name;
      let result = await axios.put(url + "/" + project.id, project);
      addLog(result.data);
    }
  } catch (err) {
    console.error(err.message);
  }

  addLog("## Test Update (PUT) Projects FINISHED");
};

testDetailProjects = async () => {
  addLog("## Test Detail (GET + ID) Projects STARTED");
  projects.forEach(async () => {
    try {
      let result = axios.get(url + "/" + project.id);
      addLog(result.data);
    } catch (err) {
      console.error(err.message);
    }
  });
  addLog("## Test Detail (GET + ID) Projects FINISHED");
};

testDeleteProjects = async () => {
  addLog("## Test DELETE Projects STARTED");
  try {
    for (let i = 0; i < projects.length / 2; i++) {
      const project = projects[i];
      let result = axios.delete(url + "/" + project.id);
      addLog(result.data);
    }
  } catch (err) {
    console.error(err);
  }

  addLog("## Test DELETE Projects FINISHED");
};

const addLog = (text) => {
  log += text + "\n";
};

const addToLogFile = (fileName, content) => {
  content = Date.now() + "\n" + content;
  fs.appendFile(fileName, content, (err, file) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`SAVED in ${fileName} !`);
  });
};
