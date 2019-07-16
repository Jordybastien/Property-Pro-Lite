import express from 'express';

import connect from 'connect-multiparty';

import passport from 'passport';

import jwt from 'jsonwebtoken';
import decode from '../MIDDLEWARE/jwt';
const verifyToken = decode.verifyToken
import {
  getAllproperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  propertyIsSold,
  updateProperty,
  getPropertiesByType,
} from '../controllers/properties';
import handleErrors from '../MIDDLEWARE/errors';
import { verify } from 'crypto';

const router = express.Router();
const connection = connect();

router.route('/allProperties')
.get(getAllproperties);

router.route('/properties/:id')
.get(getPropertyById);

router.route('/getProperty/:type')
.get(getPropertiesByType);

router.route('/postProperty')


router.route('/updateProperty/:id')
.patch(updateProperty);

router.route('/deleteProperty/:id')
.delete(deleteProperty);

router.route('/masProperty/:id/sold')
.patch(propertyIsSold);

export default router;
