import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Récupérer la liste des films
 *     responses:
 *       200:
 *         description: Liste des films
 */
router.get('/', (req, res) => {
  console.log('You are requesting movies !');
  const movieRepository = appDataSource.getRepository(Movie);
  movieRepository.find().then(function (movies) {
    res.json({ movies: movies });
  });
});

/**
 * @swagger
 * /api/movies/new:
 *   post:
 *     summary: Ajouter un film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Film ajouté
 *       500:
 *         description: Erreur serveur
 */
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
