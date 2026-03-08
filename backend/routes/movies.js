import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('You are requesting movies !');
  res.json([]);
});

router.post('/new', (req, res) => {});

export default router;
