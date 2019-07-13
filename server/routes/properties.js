import express from 'express';

import connect from 'connect-multiparty';

import passport from 'passport';

import jwt from 'jsonwebtoken';

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

const router = express.Router();
const connection = connect();

router.route('/getProperties')
.get(getAllproperties)
.all(handleErrors);

router.route('/properties/:id')
.get(getPropertyById)
.all(handleErrors);

router.route('/getProperty/:type')
.get(getPropertiesByType)
.all(handleErrors);

router.route('/postProperty')
.post(connection, createProperty)
.all(handleErrors);

router.route('/updateProperty/:id')
.patch(updateProperty)
.all(handleErrors);

router.route('/deleteProperty/:id')
.delete(deleteProperty)
.all(handleErrors);

router.route('/masProperty/:id/sold')
.patch(propertyIsSold)
.all(handleErrors);

export default router;
