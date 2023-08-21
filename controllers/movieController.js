const MovieModel = require("../models/movie");
const jwt = require('jsonwebtoken');
const handleError = (res, error) => {
    res.status(500).json({ error });
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.decoded = decoded; // Store decoded token payload for later use
        next();
    });
};


const getMovies = (req, res) => {
    MovieModel.find()
        .sort({ title: 1 })
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => handleError(res, err));
};

const getMovie = (req, res) => {
    MovieModel.findById(req.params.id)
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => handleError(res, err));
};

const deleteMovie = (req, res) => {
    MovieModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

const addMovie = (req, res) => {
    const movie = new MovieModel(req.body);
    movie
        .save()
        .then((result) => {
            res.status(201).json(result);
            console.log(req.body);
        })
        .catch((err) => handleError(res, err));
};

const updateMovie = (req, res) => {
    MovieModel.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => handleError(res, err));
};

module.exports = {
    verifyToken,
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie,
};