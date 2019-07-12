import cloudinary from 'cloudinary';
import moment from 'moment';
import properties from '../models/Property';
import propTypes from '../models/propertiesType';
import users from '../models/User';
import validatePropertyRegistration from '../MIDDLEWARE/properties';
import responses from '../helpers/responses';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dodfpnbik/upload';
const CLOUDINARY_UPLOAD_PRESET = 'cakgs8ec';
cloudinary.config({
  cloud_name: 'dodfpnbik',
  api_key: '971724881742777',
  api_secret: '3lLaxezKTIQ55htecaqrUjV6Ehs',
});

// Fetch all properties
export const getAllproperties = (req, res) => {
  if(properties){
    responses.response(res, 200, properties);
  }  
};
// Get property by ID
export const getPropertyById = (req, res) => {
  const { id } = req.params;
  const findProperty = properties.find(property => property.id == id);
  
  if(findProperty){
        //Bring in User
        let userId = findProperty.owner;
        const userInfo = users.filter(user => user.id === findProperty.owner);
        if (userInfo.length > 0) {
          //Check User owner of the property
          const propertyInfo = {
            id: findProperty.id,
            status: findProperty.status,
            price: findProperty.price,
            state: findProperty.state,
            city: findProperty.city,
            address: findProperty.address,
            type: findProperty.type,
            created_on: findProperty.created_on,
            image_url: findProperty.image_url,
            ownerEmail: userInfo[0].email,
            ownerPhoneNumber: userInfo[0].phoneNumber,
          }
          responses.response(res, 200, propertyInfo);
        }

  //responses.response(res, 200, findProperty);
  }
  else{
    responses.response(res, 404, 'No Properties found',true);
  }
  
};

// Get property by type
export const getPropertiesByType = (req, res) => {
  const { type } = req.params;
  const searchtype = propTypes.filter(prop => prop.type === type);  
  if(searchtype.length>0){
      //Searching type provided by user
  const searchProperties = properties.filter(property => property.type === type);  
  if (searchProperties.length > 0) {
    //Bring in User
    const userInfo = users.filter(user => user.id === searchProperties[0].owner);
    if (userInfo.length > 0) {
      //Check User owner of the property
      const propertyInfo = {
        id: searchProperties[0].id,
        status: searchProperties[0].status,
        price: searchProperties[0].price,
        state: searchProperties[0].state,
        city: searchProperties[0].city,
        address: searchProperties[0].address,
        type: searchProperties[0].type,
        created_on: searchProperties[0].created_on,
        image_url: searchProperties[0].image_url,
        ownerEmail: userInfo[0].email,
        ownerPhoneNumber: userInfo[0].phoneNumber,
      }
      responses.response(res, 200, propertyInfo);
    }
  }
  else{
    responses.response(res, 404, 'No Properties found on the given type',true);
  }
  }
else{
  responses.response(res,404, 'You are providing a type that is not registered',true);
}
  
};

// Create Property
export const createProperty = (req, res) => {
  const { errors, isValid } = validatePropertyRegistration(req.body);
  // check validation
  if (!isValid) {
    responses.response(res, 400, errors);
  }
  else{
    const {
      owner, price, state, city, address, type,
    } = req.body;
  
    if (!req.files.image) {
      responses.response(res, 400, 'Image field is required',true);
    }
  
  //Search Property
    const searchProperty = properties.filter(item => item.owner === owner && item.price === price && item.state === state && item.city === city && item.address === address && item.type === type);
    if (searchProperty.length > 0) {
      responses.response(res, 302, 'Property already registered', true);
    }
  
  
    const image = req.files.image.path;
    cloudinary.uploader.upload(image, (result, error) => {
      if (error) {
        responses.response(res, 404, error, true);
      }
      else{
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
        responses.response(res, 201, addProperty, false); 
      }
    });
  }

};
//Delete property
export const deleteProperty = (req, res) => {
  const { id } = req.params;
  const index = properties.findIndex(property => property.id === parseInt(id, 10));
  if (index !== -1) {
    properties.splice(index, 1);
    responses.response(res, 200, 'Property deleted', false);
  }
  else{
    responses.response(res, 404, 'No property found',true);
  }
  
};

//Mark property as sold
export const propertyIsSold = (req, res) => {
  const { id } = req.params;
  const property = properties.find(propert => propert.id === parseInt(id, 10));
  if (property) {
    property.status = 'sold';
    responses.response(res,200,property,false);
  }
  else{
    responses.response(res, 404, 'No property found', true);
  }
  
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
    responses.response(res,201,property, false);
  }
  else{
    responses.response(res, 404, 'No property found', true);
  }
};
