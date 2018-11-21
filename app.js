var express = require("express");
var app = express();
var db = require("./app/dbConfig/db");
var path = require("path");

/** Configuring view engine **/

// Tells express to render with ejs.
app.set("view engine", "ejs");
// Set default view path. Tells ejs where to find view templates
app.set("views", "./app/views");

var OrdersController = require("./app/controllers/ordersController");
app.use("/", OrdersController);
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
