const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/create", (req, res) => {
  console.log("hola");
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })

    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log("Error while creating a new celebrity", err);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((dbCelebrities) => {
      console.log("hellohere!!!!" + dbCelebrities);
      res.render("celebrities/celebrities", { dbCelebrities });
    })
    .catch((err) => console.error(`Err while displaying celebrities: ${err}`));
});

module.exports = router;
