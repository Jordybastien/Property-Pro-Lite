import express from 'express';

import {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} from '../controllers/users';

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/user', createUser);

router.post('/login', loginUser);

export default router;
