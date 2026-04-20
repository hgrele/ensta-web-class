import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { appDataSource } from './datasource.js';
import { swaggerSpec } from './docs/swagger.js';
import moviesRouter from './routes/movies.js';
import usersRouter from './routes/users.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';

const apiRouter = express.Router();

const app = express();

app.use(logger('dev'));
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  try {
    await ensureDb();
    next();
  } catch (err) {
    next(err);
  }
});

// Register routes
apiRouter.get('/', (req, res) => {
  res.send('Hello from Express!');
});
apiRouter.use('/users', usersRouter);
apiRouter.use('/movies', moviesRouter);

// Register API router
app.use('/', apiRouter);

// Add route for swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register 404 middleware and error handler
app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

let isInitialized = false;

export async function ensureDb() {
  if (isInitialized) {
    return;
  }
  console.log({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
  });

  await appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      isInitialized = true;
      console.log('DB initialized');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
}

export default app;
