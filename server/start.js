var express = require('express');
var path = require('path');
var open = require('open');

const pg = require('pg')  
const conString = 'postgres://postgres:rzWLKE4L@localhost/bn' // make sure to match your own database's credentials

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err, result) {
    done();

    if (err) {
      return console.error('error happened during query', err);
    }
    console.log(result.rows[0]);
    //process.exit(0)
  })
})

var port = 3000;
var app = express();

//prepare server
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/angular")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/chart.js/dist")));
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