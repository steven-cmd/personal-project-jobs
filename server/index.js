require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const express = require("express");
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
const authCtrl = require("./controllers/authController");
const skillCtrl = require("./controllers/skillController");
const app = express();
