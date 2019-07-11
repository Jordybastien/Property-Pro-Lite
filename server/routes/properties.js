import express from 'express';

import connect from 'connect-multiparty';

import passport from 'passport';

import jwt from 'jsonwebtoken';

import {
  getAllproperties,
  getPropertyById,
  // createProperty,
  // deleteProperty,
  // propertyIsSold,
  // updateProperty,
  // getPropertiesByType,
} from '../controllers/properties';

const router = express.Router();
const connection = connect();
router.get('/getProperties', getAllproperties);

router.get('/properties/:id', getPropertyById);

// router.get('/getProperty/:type', getPropertiesByType);

// router.post('/postProperty', connection, createProperty);

// router.patch('/updateProperty/:id', updateProperty);

// router.delete('/deleteProperty/:id', deleteProperty);

// router.patch('/masProperty/:id/sold', propertyIsSold);

export default router;
