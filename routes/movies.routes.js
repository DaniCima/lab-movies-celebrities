const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((dbCelebrities) => {
      res.render("movies/new-movie", { dbCelebrities });
    })
    .catch((err) =>
      console.error(`Err while displaying movies input page: ${err}`)
    );
});
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })

    .then(() => res.redirect("/movies"))
    .catch((err) => {
      console.log("Error while creating a new celebrity", err);
      res.render("movies/new-movie");
    });
});

router.get("/", (req, res) => {
  Movie.find()
    .then((dbMovies) => {
      console.log("hello3" + dbMovies);
      res.render("movies/movies", { dbMovies });
    })
    .catch((err) => console.error(`Err while displaying celebrities: ${err}`));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((clickedMovie) => {
      console.log("HEY??");
      console.log(clickedMovie);
      res.render("movies/movie-details", clickedMovie);
    })
    .catch((err) => `error while displaying movie details: ${err}`);
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => `error while deleting movie: ${err}`);
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Movie.findById(id).then((theMovie) => {
    res.render("movies/edit-movie", theMovie);
  });
  Celebrity.find()
    .then((foundedCelebrities) => {
      console.log(foundedCelebrities);
      res.render("movies/edit-movie", foundedCelebrities);
    })
    .catch((err) => `error while editing the movie: ${err}`);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { name, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { name, genre, plot, cast }, { new: true })
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie.id}`))
    .catch((error) =>
      console.log(`Error while updating a single Movie: ${error}`)
    );
});

module.exports = router;
