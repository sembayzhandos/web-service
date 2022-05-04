const express = require("express"),
    app = express(),
    port = process.env.PORT || 8000;
const bodyParser = require("body-parser");

//Use bodyParser()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

global.myPoints = [];

var pointRouter = require("./API/route");
app.use("/", pointRouter);

app.listen(port);

console.log("WEB service started on " + port + "port");
