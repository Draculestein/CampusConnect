import { Router } from "express";

const resultRouter = Router();

resultRouter.get('/', function(req, res, next) {
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

export default resultRouter;