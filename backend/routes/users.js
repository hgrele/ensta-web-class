import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Créer un compte utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstname
 *               - lastname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: L'utilisateur existe déjà
 */
router.post('/signup', function (req, res) {
  const { email, firstname, lastname, password } = req.body;
  const userRepository = appDataSource.getRepository(User);

  bcrypt.hash(password, 10).then(function (hash) {
    const newUser = userRepository.create({ email, firstname, lastname, hash });
    userRepository
      .insert(newUser)
      .then(function () {
        res.status(201).json({ message: 'User created successfully' });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ message: 'User already exists' });
      });
  });
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', function (req, res) {
  const { email, password } = req.body;
  const userRepository = appDataSource.getRepository(User);

  userRepository
    .findOneBy({ email })
    .then(function (user) {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Email ou mot de passe incorrect' });
      }
      bcrypt.compare(password, user.hash).then(function (match) {
        if (!match) {
          return res
            .status(401)
            .json({ message: 'Email ou mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
