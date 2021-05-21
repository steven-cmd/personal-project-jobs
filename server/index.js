require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const express = require("express");
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
const userCtrl = require("./controllers/user");
const skillCtrl = require("./controllers/skill");
const app = express();

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("database is connnected");
  app.listen(SERVER_PORT, (_) => console.log(`running on ${SERVER_PORT}`));
});
