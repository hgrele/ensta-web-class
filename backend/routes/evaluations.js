import express from 'express';
import { appDataSource } from '../datasource.js';
import Evaluation from '../entities/evaluation.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/evaluations/movie/{movieId}:
 * post:
 * summary: Add or update an evaluation (hating + Comment) for a movie
 * security:
 * - BearerAuth: []
 */
router.post('/movie/:movieId', authenticateToken, async function (req, res) {
  try {
    const evaluationRepository = appDataSource.getRepository(Evaluation);
    const { hating, comment } = req.body;
    const userId = req.user.user_id; // Assumes your JWT sets req.user
    const movieId = req.params.movieId;

    // Check if the user already evaluated this movie
    const existingEval = await evaluationRepository.findOne({
      where: { user: { user_id: userId }, movie: { movie_id: movieId } },
    });

    if (existingEval) {
      // Update existing evaluation (overwrites previous comment, resets deletion status)
      existingEval.hating = hating;
      existingEval.comment = comment;
      existingEval.comment_deleted = false;
      const updated = await evaluationRepository.save(existingEval);

      return res.status(200).json(updated);
    }

    // Create new evaluation
    const newEval = evaluationRepository.create({
      hating: hating,
      comment: comment,
      user: { user_id: userId },
      movie: { movie_id: movieId },
    });

    const saved = await evaluationRepository.save(newEval);
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while saving the evaluation' });
  }
});

/**
 * @swagger
 * /api/evaluations/movie/{movieId}:
 * get:
 * summary: Get all evaluations for a specific movie
 */
router.get('/movie/:movieId', async function (req, res) {
  try {
    const evaluationRepository = appDataSource.getRepository(Evaluation);
    const evaluations = await evaluationRepository.find({
      where: { movie: { movie_id: req.params.movieId } },
      relations: ['user'], // Fetch user details alongside the comment
      order: { updated_at: 'DESC' },
    });

    // Map results to hide deleted comments while keeping the hating
    const safeEvaluations = evaluations.map((ev) => ({
      evaluation_id: ev.evaluation_id,
      hating: ev.hating,
      comment: ev.comment_deleted
        ? '[This comment has been deleted]'
        : ev.comment,
      hates_count: ev.hates_count,
      updated_at: ev.updated_at,
      user: {
        user_id: ev.user.user_id,
        firstname: ev.user.firstname,
        lastname: ev.user.lastname,
      },
    }));

    res.json({ evaluations: safeEvaluations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching evaluations' });
  }
});

/**
 * @swagger
 * /api/evaluations/movie/{movieId}/stats:
 * get:
 * summary: Calculate the overall average hating for a movie
 */
router.get('/movie/:movieId/stats', async function (req, res) {
  try {
    const stats = await appDataSource
      .getRepository(Evaluation)
      .createQueryBuilder('evaluation')
      .select('AVG(evaluation.hating)', 'averagehating')
      .addSelect('COUNT(evaluation.evaluation_id)', 'totalReviews')
      .where('evaluation.movie_id = :movieId', { movieId: req.params.movieId })
      .getRawOne();

    res.json({
      average_hating: parseFloat(stats.averagehating) || 0,
      total_reviews: parseInt(stats.totalReviews) || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error calculating stats' });
  }
});

/**
 * @swagger
 * /api/evaluations/{evaluationId}/comment:
 * delete:
 * summary: Soft delete a comment (Admin or Owner only)
 * security:
 * - BearerAuth: []
 */
router.delete(
  '/:evaluationId/comment',
  authenticateToken,
  async function (req, res) {
    try {
      const evaluationRepository = appDataSource.getRepository(Evaluation);
      const evaluation = await evaluationRepository.findOne({
        where: { evaluation_id: req.params.evaluationId },
        relations: ['user'],
      });

      if (!evaluation) {
        return res.status(404).json({ message: 'Evaluation not found' });
      }

      // Check permissions: Must be the owner or an admin
      const isOwner = evaluation.user.user_id === req.user.user_id;
      const isAdmin = req.user.is_admin === true;

      if (!isOwner && !isAdmin) {
        return res
          .status(403)
          .json({ message: 'Forbidden: You cannot delete this comment' });
      }

      // Soft delete the comment (hating remains untouched)
      evaluation.comment_deleted = true;
      await evaluationRepository.save(evaluation);

      res.status(200).json({ message: 'Comment successfully removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting comment' });
    }
  },
);

/**
 * @swagger
 * /api/evaluations/{evaluationId}/hate:
 * put:
 * summary: Rate/hate another user's comment
 * security:
 * - BearerAuth: []
 */
router.put('/:evaluationId/hate', authenticateToken, async function (req, res) {
  try {
    // Note: For a robust system, you'd track WHICH user hated WHICH comment
    // in a separate many-to-many table to prevent infinite liking.
    // This increments a basic counter for simplicity.
    const evaluationRepository = appDataSource.getRepository(Evaluation);

    await evaluationRepository.increment(
      { evaluation_id: req.params.evaluationId },
      'hates_count',
      1,
    );

    res.status(200).json({ message: 'Comment hated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error hating comment' });
  }
});

/**
 * @swagger
 * /api/evaluations/{evaluationId}/hate:
 * delete:
 * summary: Remove a hate from another user's comment
 * security:
 * - BearerAuth: []
 */
router.delete(
  '/:evaluationId/hate',
  authenticateToken,
  async function (req, res) {
    try {
      const evaluationRepository = appDataSource.getRepository(Evaluation);

      // First, find the evaluation to check the current hate count
      const evaluation = await evaluationRepository.findOne({
        where: { evaluation_id: req.params.evaluationId },
      });

      if (!evaluation) {
        return res.status(404).json({ message: 'Evaluation not found' });
      }

      // Prevent the hates_count from going into negative numbers
      if (evaluation.hates_count > 0) {
        await evaluationRepository.decrement(
          { evaluation_id: req.params.evaluationId },
          'hates_count',
          1,
        );
      }

      res.status(200).json({ message: 'hate successfully removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing hate' });
    }
  },
);

export default router;
