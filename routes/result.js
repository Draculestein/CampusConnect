var express = require('express');
var router = express.Router();

/* GET result */
router.get('/', function(req, res, next) {
  res.render('result page', {
    content: [{
        image: '/images/2Q.png',
        background : ''
      },
      {
        image: '/images/3Q.png',
        background : ''
      }
    ]
  });
});

module.exports = router;
