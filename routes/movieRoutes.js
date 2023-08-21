const express = require("express");

const {
    verifyToken,
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/movies", verifyToken, getMovies);
router.get("/movies/:id", verifyToken, getMovie);
router.delete("/movies/:id", verifyToken, deleteMovie);
router.post("/movies", verifyToken, addMovie);
router.patch("/movies/:id", verifyToken, updateMovie);

module.exports = router;