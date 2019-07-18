import dotenv from 'dotenv';
import { Client, Pool } from 'pg';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  module.exports = new Client({ connectionString: process.env.DATABASE_URL });
} else if (process.env.NODE_ENV === 'testing') {
  module.exports = new Client({ connectionString: process.env.DB_TEST });
} else {
  module.exports = new Client({ connectionString: process.env.DATABASE_URL });
}
