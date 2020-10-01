const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./database");
const cors = require("cors");

const expressBundle = express();

expressBundle.use(cors());
expressBundle.use(bodyParser.json());
expressBundle.use(bodyParser.urlencoded({extended: false}));
expressBundle.use(morgan('combined'));

module.exports = expressBundle;