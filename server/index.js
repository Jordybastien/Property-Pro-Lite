import express from 'express';
// importing routes
import bodyParser from 'body-parser';
import users from './routes/users';
import properties from './routes/properties';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', users);
app.use('/api/v1', properties);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is Running on port ${PORT}`);
});

export default app;
