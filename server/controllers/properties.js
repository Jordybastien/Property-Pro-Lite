import cloudinary from 'cloudinary';
import moment from 'moment';
import properties from '../models/Property';
import propTypes from '../models/propertiesType';
import users from '../models/User';
import validatePropertyRegistration from '../MIDDLEWARE/properties';
import responses from '../helpers/responses';
import jwt from 'jsonwebtoken';
import {Client} from 'pg';
import { doesNotReject } from 'assert';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dodfpnbik/upload';
const CLOUDINARY_UPLOAD_PRESET = 'cakgs8ec';
cloudinary.config({
  cloud_name: 'dodfpnbik',
  api_key: '971724881742777',
  api_secret: '3lLaxezKTIQ55htecaqrUjV6Ehs',
});
const client = new Client({
  user: "postgres",
  password: "Qwerty123@",
  host: "localhost",
  port: 5432,
  database: "Property-Pro-Lite"
})
client.connect()
// Fetch all properties
export const getAllproperties = (req, res) => {
  //if(properties){
    //return responses.response(res, 200, properties);
  //} 
  client.query('SELECT * FROM properties', function(err, result){
    if (err){
      return responses.response(res, 404, 'Error running query',true);
    }else{
      let resul = result.rows;
      return responses.response(res,200, resul,false);
      done();
    }
  })

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
          return responses.response(res, 200, propertyInfo);
        }

  }
  else{
    return responses.response(res, 404, 'No Properties found',true);
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
      return responses.response(res, 200, propertyInfo);
    }
  }
  else{
    return responses.response(res, 404, 'No Properties found on the given type',true);
  }
  }
else{
  return responses.response(res,404, 'You are providing a type that is not registered',true);
}
  
};

// Create Property
// export const createProperty = (req, res) => {
//   const { errors, isValid } = validatePropertyRegistration(req.body);
//   // check validation
//   if (!isValid) {
//     return responses.response(res, 400, errors);
//   }
//   else{
//             //Decoding token to receive Owner Id
//     const tokens = req.headers['authorization'];
//     const token = tokens.split(' ')[1];
//     const decoded = jwt.verify(token, 'rugumbira');
    
//     const {
//       owner, price, state, city, address, type,
//     } = req.body;
  
//     if (!req.files.image) {
//       return responses.response(res, 400, 'Image field is required',true);
//     }
  
//   //Search Property
//     const searchProperty = properties.filter(property => property.owner === decoded.id && property.price === price && property.state === state && property.city === city && property.address === address && property.type === type);
//     if (searchProperty.length > 0) {
//       return responses.response(res, 302, 'Property already registered', true);
//     }
  
  
//     const image = req.files.image.path;
//     cloudinary.uploader.upload(image, (result, error) => {
//       if (error) {
//         return responses.response(res, 404, error, true);
//       }
//       else{


//         const addProperty = {
//           id: properties.length + 1,
//           owner:decoded.id,
//           status: 'available',
//           price,
//           state,
//           city,
//           address,
//           type,
//           created_on: moment().format(),
//           image_url: result.url,
//         };
//         const tobeSent = {
//           id: properties.length + 1,
//           status: 'available',
//           price,
//           state,
//           city,
//           address,
//           type,
//           created_on: moment().format(),
//           image_url: result.url,
//         };
//         properties.push(addProperty);
//         return responses.response(res, 201, tobeSent, false); 
//       }
//     });
//   }

// };
export const createProperty = (req, res) => {
  


  //Save to Postgres
  let recordprop = client.query('INSERT INTO properties(owner,status, price,state, city, address, type, created_on, image_url)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[
    req.body.owner, 'available', req.body.price, req.body.state, req.body.city,req.body.address,req.body.type,moment().format(),'new image',
  ]);
  if (!recordprop){
    return responses.response(res, 404, 'Error running query',true);
  }else{
  return responses.response(res,201,'Recorded',false);  
  done();
  }
};
//Delete property
export const deleteProperty = (req, res) => {

  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, 'rugumbira')  
  const { id } = req.params;
  const index = properties.findIndex(property => property.id === parseInt(id, 10));
  const findProperty = properties.find(property => property.id == id);
  if(findProperty){
    if (index !== -1) {
      if(decoded.id === findProperty.owner) {
      properties.splice(index, 1);
      return responses.response(res, 200, 'Property deleted', false);
    }else{
      return responses.response(res, 404, ' You do not have the Authorization to Delete this property',true);
    }
    }
    else{
      return responses.response(res, 404, 'No property found',true);
    }  
  }
  else{
    return responses.response(res, 404, 'No property found',true);
  }

};

//Mark property as sold
export const propertyIsSold = (req, res) => {
  
  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, 'rugumbira')  
  const { id } = req.params;
  const property = properties.find(propert => propert.id === parseInt(id, 10));
  const findProperty = properties.find(property => property.id == id);
  if(findProperty){
    if (property) {
      if(decoded.id === findProperty.owner) {
        property.status = 'sold';
        return responses.response(res,200,property,false);
    }else{
      return responses.response(res, 404, ' You do not have the Authorization to Delete this property',true);
    }
    }
    else{
      return responses.response(res, 404, 'No property found',true);
    }  
  }
  else{
    return responses.response(res, 404, 'No property found',true);
  }
  
};

//Update Property
export const updateProperty = (req, res) => {
  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, 'rugumbira')  
  const { id } = req.params;
  const property = properties.find(pro => pro.id === parseInt(id, 10));
  
  if (property) {
    const datas = Object.keys(req.body);
    const{price} =req.body;
    if(price){
      if(price<=0){
        return responses.response(res, 404, 'The price can not be less than or equal to 0', true);    
      }
    }
    if(decoded.id === property.owner) {
    datas.forEach((data) => {
      property[data] = req.body[data];
    });
    return responses.response(res,201,property, false);
  }else{
    return responses.response(res, 404, ' You do not have the Authorization to Delete this property',true);
  }
  }
  else{
    return responses.response(res, 404, 'No property found', true);
  }
};
