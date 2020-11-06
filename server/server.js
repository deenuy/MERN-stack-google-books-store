import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import booksRoute from './routes/booksRoute';

const localmongodbUrl = config.MONGODB_URL;

mongoose
  .connect(
    process.env.MONGODB_URI || localmongodbUrl, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/books', booksRoute), (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
};

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});