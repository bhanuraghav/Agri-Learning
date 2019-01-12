const express = require("express");
const errorController = require("./../controllers/errorController");
const homeControlller = require("../controllers/homeController");

//IMPORT ALL ROUTES HERE

const router = express.Router();

router.get("/", homeControlller.getHome);
router.post('/', homeControlller.postImage);

router.get("/500", errorController.get500);
// router.get('/add-disease', require('./addData.js'));
router.use(errorController.get404);

router.use((error, req, res, next) => {
  console.log(error);
  console.error(error.stack);
  res.status(500).render("500", {
    path: "/500",
    error
  });
});

// router.use('/add-disease', require('./addData.js'));

module.exports = router;
