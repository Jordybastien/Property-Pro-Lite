import cloudinary from 'cloudinary';
import moment from 'moment';
import properties from '../models/Property';
import validatePropertyRegistration from '../validations/properties';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dodfpnbik/upload';
const CLOUDINARY_UPLOAD_PRESET = 'cakgs8ec';
cloudinary.config({
  cloud_name: 'dodfpnbik',
  api_key: '971724881742777',
  api_secret: '3lLaxezKTIQ55htecaqrUjV6Ehs',
});

// Fetch all properties
export const getAllproperties = (req, res) => {
  res.status(200).send(properties);
};
// Get property by ID
export const getPropertyById = (req, res) => {
  const { id } = req.params;
  const findProperty = properties.find(property => property.id == id);
  res.send(findProperty);
};

// Get property by type
export const getPropertiesByType = (req, res) => {
  const { type } = req.params;
  const searchProperties = properties.filter(property => property.type === type);
  if (searchProperties.length > 0) {
    return res.status(200).json({
      status: res.statusCode,
      data: searchProperties,
    });
  }
  return res.status(404).json({
    status: res.statusCode,
    error: 'No properties found of the given type',
  });
};

// Create Property
export const createProperty = (req, res) => {
  const { errors, isValid } = validatePropertyRegistration(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    owner, price, state, city, address, type,
  } = req.body;

  if (!req.files.image) {
    return res.status(404).json({
      status: res.statusCode,
      error: 'Image field is required',
    });
  }

//Search Property
  const searchProperty = properties.filter(item => item.owner === owner && item.price === price && item.state === state && item.city === city && item.address === address && item.type === type);
  if (searchProperty.length > 0) {
    return res.status(401).json({
      status: res.statusCode,
      error: 'Property already registered',
    });
  }


  const image = req.files.image.path;
  cloudinary.uploader.upload(image, (result, error) => {
    if (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
    const addProperty = {
      id: properties.length + 1,
      owner,
      status: 'available',
      price,
      state,
      city,
      address,
      type,
      created_on: moment().format(),
      image_url: result.url,
    };
    properties.push(addProperty);
    return res.status(201).json({
      status: res.statusCode,
      data: addProperty,
    });
  });
};
//Delete property
export const deleteProperty = (req, res) => {
  const { id } = req.params;
  const index = properties.findIndex(property => property.id === parseInt(id, 10));
  if (index !== -1) {
    properties.splice(index, 1);
    return res.status(200).json({
      status: res.statusCode,
      message: 'Property deleted!',
    });
  }
  return res.status(404).json({
    status: res.statusCode,
    error: 'No property found',
  });
};

//Mark property as sold
export const propertyIsSold = (req, res) => {
  const { id } = req.params;
  const property = properties.find(propert => propert.id === parseInt(id, 10));
  if (property) {
    property.status = 'sold';
    return res.status(200).json({
      status: res.statusCode,
      data: property,
    });
  }
  return res.status(404).json({
    status: res.statusCode,
    error: 'No property found',
  });
};

//Update Property
export const updateProperty = (req, res) => {
  const { id } = req.params;

  const property = properties.find(pro => pro.id === parseInt(id, 10));
  if (property) {
    const datas = Object.keys(req.body);
    datas.forEach((data) => {
      property[data] = req.body[data];
    });
    return res.status(201).json({
      status: res.statusCode,
      data: property,
    });
  }
};
