var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries');

router.get('/api/batches', db.getAllBatches);
router.get('/api/batches/:id', db.getSingleBatch);
router.post('/api/batches', db.createBatch);
router.put('/api/batches/:id', db.updateBatch);
router.delete('/api/batches/:id', db.removeBatch);

router.get('/api/pages', db.getAllPages);

module.exports = router;
