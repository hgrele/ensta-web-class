import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { appDataSource } from '../datasource.js';
import Authentication from '../entities/authentication.js';
import { authenticateToken } from '../middlewares/auth.js';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes (signup, login, user info)
 */

const router = express.Router();

/**
 * @swagger
 * /api/auths/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already in use
 *       500:
 *         description: Server error while creating user
 */

router.post('/signup', async function (req, res) {
  const authRespository = appDataSource.getRepository(Authentication);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(req);
  const newRegister = authRespository.create({
    email: req.body.email,
    password_hash: hashedPassword,
  });

  authRespository
    .insert(newRegister)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Email already in use`,
        });
      } else {
        res.status(500).json({ message: 'Error while registering user' });
      }
    });
  console.log(req.body.email, hashedPassword);
});

/**
 * @swagger
 * /api/auths/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error during login
 */

router.post('/login', async (req, res) => {
  try {
    const authRepository = appDataSource.getRepository(Authentication);

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await authRepository.findOneBy({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
});

/**
 * @swagger
 * /api/auths/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current authenticated user
 *     description: Returns info about the currently authenticated user.
 *     security:
 *       - BearerAuth: []  # JWT required
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized – token missing or invalid
 */
router.get('/me', authenticateToken, (req, res) => {
  res.send(req.user);
});

export default router;
