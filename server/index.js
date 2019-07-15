import express from 'express';
import passport from 'passport';
// importing routes
import bodyParser from 'body-parser';
import users from './routes/users';
import properties from './routes/properties';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//passport Config

app.use('/api/v1', users);
app.use('/api/v1', properties);



app.use((req, res, next) => {
  const error = new Error('Method not allowed');
  error.status = 405;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ status: error.status || 500, error: error.message });
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is Running on port ${PORT}`);
});

export default app;
