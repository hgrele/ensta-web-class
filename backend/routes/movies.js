import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('You are requesting movies !');
  const movieRepository = appDataSource.getRepository(Movie);
  movieRepository.find().then(function (movies) {
    res.json({ movies: movies });
  });
});

router.post('/new', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while creating the movie' });
    });
});

export default router;
