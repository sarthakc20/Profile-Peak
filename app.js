const dotenv = require("dotenv");
// const mongoose = require('mongoose');
const express = require("express");
const app = express();
const path = require('path');

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());

//Link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT || 8000;

// Let Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/./client/build/index.html'));
})


// middleware
// const middleware = (req, res, next) => {
//     console.log("my middleware");
// }
// middleware();
// app.get('/', (req, res) => {
//     res.send("Hello World");
// });
// app.get('/about', (req, res) => {
//     res.send("Hello World in about");
// });
// app.get('/contact', (req, res) => {
//     res.send("Hello World in contact");
// });


app.get("/signin", (req, res) => {
  res.send("log in");
});

app.get("/signup", (req, res) => {
  res.send("registration");
});


app.listen(PORT, () => {
  console.log("Server is running");
});
