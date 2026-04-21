import express from 'express';
import { appDataSource } from '../datasource.js';
import Hated from '../entities/hated.js';
import { authenticateToken } from '../middlewares/auth.js';

/**
 * @swagger
 * tags:
 * - name: Hateds
 * description: Hateds routes
 */

const router = express.Router();

/**
 * @swagger
 * /api/Hateds:
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
    .getRepository(Hated)
    .find({
      where: {
        user: {
          user_id: currentUserId,
        },
      },
      relations: ['movie'], // get all the movies infos: does a joint
    })
    .then(function (Hateds) {
      res.json({ Hateds: Hateds });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching hateds' });
    });
});

/**
 * @swagger
 * /api/Hateds/add:
 *   post:
 *     summary: Ajouter un film aux hateds de l'utilisateur
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
  const hatedRepository = appDataSource.getRepository(Hated);

  const currentUserId = req.userInfo.userId;

  const newHated = hatedRepository.create({
    user: { id: currentUserId },
    movie: { id: req.body.movie_id },
  });

  hatedRepository
    .insert(newHated)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `This movie is already in your hateds.`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Hated' });
      }
    });
});

/**
 * @swagger
 * /api/Hateds/{movieId}:
 *   delete:
 *     summary: Remove a movie from hateds
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Movie to unhated
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Hated not found
 */
router.delete('/:movieId', authenticateToken, function (req, res) {
  const currentUserId = req.userInfo.userId;

  appDataSource
    .getRepository(Hated)
    .delete({
      user_id: currentUserId,
      movie_id: req.params.movieId,
    })
    .then(function (result) {
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Hated not found' });
      }
      res.status(204).send();
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while removing the Hated' });
    });
});

export default router;
