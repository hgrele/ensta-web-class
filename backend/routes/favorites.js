import express from 'express';
import { appDataSource } from '../datasource.js';
import Favorite from '../entities/favorite.js';
import { authenticateToken } from '../middlewares/auth.js';

/**
 * @swagger
 * tags:
 * - name: Favorites
 * description: Favorites routes
 */

const router = express.Router();

/**
 * @swagger
 * /api/Favorites:
 *   get:
 *     summary: Récupérer la liste des films marqués par l'utilisateur connecté
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des films
 */
router.get('/', authenticateToken, function (req, res) {
  const currentUserId = req.userInfo.userId;

  appDataSource
    .getRepository(Favorite)
    .find({
      where: {
        user: {
          user_id: currentUserId,
        },
      },
      relations: ['movie'], // get all the movies infos: does a joint
    })
    .then(function (Favorites) {
      res.json({ Favorites: Favorites });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching favorites' });
    });
});

/**
 * @swagger
 * /api/Favorites/add:
 *   post:
 *     summary: Ajouter un film aux favorites de l'utilisateur
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Film ajouté
 *       500:
 *         description: Erreur serveur
 */
router.post('/add', authenticateToken, function (req, res) {
  const favoriteRepository = appDataSource.getRepository(Favorite);

  const currentUserId = req.userInfo.userId;

  const newFavorite = favoriteRepository.create({
    user: { id: currentUserId },
    movie: { id: req.body.movie_id },
  });

  favoriteRepository
    .insert(newFavorite)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `This movie is already in your favorites.`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Favorite' });
      }
    });
});

/**
 * @swagger
 * /api/Favorites/{movieId}:
 *   delete:
 *     summary: Remove a movie from favorites
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Movie to unfavorite
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Favorite not found
 */
router.delete('/:movieId', authenticateToken, function (req, res) {
  const currentUserId = req.userInfo.userId;

  appDataSource
    .getRepository(Favorite)
    .delete({
      user_id: currentUserId,
      movie_id: req.params.movieId,
    })
    .then(function (result) {
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      res.status(204).send();
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while removing the Favorite' });
    });
});

export default router;
