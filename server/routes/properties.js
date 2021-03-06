import express from 'express';

import connect from 'connect-multiparty';

import passport from 'passport';

import jwt from 'jsonwebtoken';
import decode from '../middleware/jwt';
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
import handleErrors from '../middleware/errors';

const router = express.Router();
const connection = connect();

router.route('/allProperties')
.get(getAllproperties);

router.route('/properties/:id')
.get(getPropertyById);

router.route('/getProperty/:type')
.get(getPropertiesByType);

router.route('/postProperty')
.post(verifyToken, connection, createProperty);

router.route('/updateProperty/:id')
.patch(verifyToken, connection, updateProperty);

router.route('/deleteProperty/:id')
.delete(verifyToken, deleteProperty);

router.route('/masProperty/:id/sold')
.patch(verifyToken, propertyIsSold);

export default router;
