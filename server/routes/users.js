import express from 'express';

import {
  createUser,
  loginUser,
} from '../controllers/users';

const router = express.Router();

router.route('/auth/signup')
.post(createUser);

router.route('/auth/signin')
.post(loginUser);

export default router;
