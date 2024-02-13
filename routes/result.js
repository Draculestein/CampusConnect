var express = require('express');
var router = express.Router();

/* GET result */
router.get('/', function(req, res, next) {
  res.render('result page', {
    content: [
      {
        image: '/images/Harvard.png',
        background : '/images/harvardbuilding.png'
      },
      {
        image: '/images/UofU.png',
        background : '/images/uofubuilding.jpeg'
      },
      {
        image: '/images/MIT.png',
        background : '/images/mitbuilding.jpeg'
      },
      {
        image: '/images/Stanford.png',
        background : '/images/stanfordbuilding.jpeg'
      },
      {
        image: '/images/UofW.png',
        background : '/images/uofwbuilding.jpeg'
      },
    ]
  });
});

module.exports = router;
