import { Router } from "express";

const viewsRouter = Router();

// Home page
viewsRouter.get("/", (req, res) => {
    // render the index template
    res.render("index");
});

// Signup page
viewsRouter.get("/signup", (req, res) => {
 
});

// Login page
viewsRouter.get("/login", (req, res) => {

});

// Form page
viewsRouter.get("/form", (req, res) => {
    // render the index template
    res.render("fill-in-sheet");
});

// University search result page
viewsRouter.get('/result', function(req, res, next) {
    res.render('result_page', {
      content: [
        {
          image: '/images/UofU.png',
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

export default viewsRouter;