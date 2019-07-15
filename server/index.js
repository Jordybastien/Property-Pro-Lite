import express from 'express';
import passport from 'passport';
// importing routes
import bodyParser from 'body-parser';
import users from './routes/users';
import properties from './routes/properties';
import {Client} from 'pg';
const client = new Client({
   user: "postgres",
   password: "Qwerty123@",
   host: "localhost",
   port: 5432,
   database: "Property-Pro-Lite"
})
client.connect()
.then(() => console.log("Connected successfully"))
// .then(() => client.query("insert into users values ($1,$2,$3,$4,$5,$6,$7,$8)",[1, 'test@gmail.com','Rug','Jor','123456','0785634779','Kicukiro',true]))
// .then(() => client.query("select * from users"))
.then(results => console.table(results.rows))
.catch(e => console.log)
.finally(() => client.end());
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
