var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:rzWLKE4L@localhost/bn';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllBatches: getAllBatches,
  getSingleBatch: getSingleBatch,
  createBatch: createBatch,
  updateBatch: updateBatch,
  removeBatch: removeBatch,
  getAllPages: getAllPages
};

function getAllBatches(req, res, next) {
  db.any('select * from batches')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL batches'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleBatch(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from batches where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE batch'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createBatch(req, res, next) {
  req.body.blg = parseInt(req.body.blg);
  req.body.vol = parseInt(req.body.vol);
  db.none('insert into batches(name, style, blg, vol)' +
      'values(${name}, ${style}, ${blg}, ${vol})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one batch'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateBatch(req, res, next) {
  db.none('update batches set name=$1, style=$2, blg=$3, vol=$4 where id=$5',
    [req.body.name, req.body.style, parseInt(req.body.blg),
      parseInt(req.body.vol), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated batch'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeBatch(req, res, next) {
  var batchID = parseInt(req.params.id);
  db.result('delete from batches where id = $1', batchID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} batches`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllPages(req, res, next) {
   db.any('select * from pages')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL pages'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}