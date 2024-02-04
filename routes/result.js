var express = require('express');
var router = express.Router();

/* GET result */
router.get('/', function(req, res, next) {
  res.render('result page');
});

module.exports = router;
