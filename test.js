const axios = require("axios");

const url = "http://localhost:8000/api/projects";

setTimeout(() => {
  axios
    .get(url)
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error.message);
    });

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      let time = +new Date();
      axios
        .post(url, {
          name: "Test Projekt " + time,
        })
        .then((result) => {
          console.log(result.data);
        });
    }, 200 * i);
  }
}, 4000);
