import express from 'express';

import {
  createUser,
  loginUser,
} from '../controllers/users';

const router = express.Router();

router.route('/userSignup')
.post(createUser);

router.route('/userLogin')
.post(loginUser);

export default router;
