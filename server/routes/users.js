import express from 'express';

import {
  createUser,
  loginUser,
} from '../controllers/users';
import handleErrors from '../MIDDLEWARE/errors';

const router = express.Router();

router.route('/user')
.post(createUser)
.all(handleErrors);

router.route('/login')
.post(loginUser)
.all(handleErrors);

export default router;
