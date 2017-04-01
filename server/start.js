const express = require('express');
const path = require('path');
const open = require('open');
//const pg = require('pg')  
//const conString = 'postgres://postgres:rzWLKE4L@localhost/bn' // make sure to match your own database's credentials

var port = 3000;
var app = express();

var routes = require('./routes/index');
app.use('/routes', routes);

//prepare server
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/angular")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/chart.js/dist")));
app.use("/js", express.static(path.join(__dirname, "routes")));
app.use("/js", express.static(path.join(__dirname, "../client/js")));

app.use("/content", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/content", express.static(path.join(__dirname, "../client/content")));

app.use("/fonts", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/fonts")));

app.use("/templates", express.static(path.join(__dirname, "../client/views/templates")));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
})