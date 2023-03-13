import dotenv from 'dotenv';
import app from './src/app';
import subscriber from './src/subscribers/votes';

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server http://localhost:${port}`);
  // Event subscriber
  subscriber();
});
