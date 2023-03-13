import bodyParser from 'body-parser';
import express, { Express } from 'express';
import votes from './routes/votes';
import cors from 'cors';

const app: Express = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use('/api/votes', votes);

export default app;
