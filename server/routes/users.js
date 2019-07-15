import express from 'express';

import {
  createUser,
  loginUser,
} from '../controllers/users';

const router = express.Router();

router.route('/user')
.post(createUser);

router.route('/login')
.post(loginUser);

export default router;
