var express = require('express');
var path = require('path');
var open = require('open');

var port = 3000;
var app = express();

//prepare server
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/angular")));
app.use("/js", express.static(path.join(__dirname, "../src/js")));

app.use("/content", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/content", express.static(path.join(__dirname, "../src/content")));

app.use("/templates", express.static(path.join(__dirname, "../src/templates")));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
})