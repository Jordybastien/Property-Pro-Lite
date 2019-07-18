import cloudinary from 'cloudinary';
import moment from 'moment';
import properties from '../models/Property';
import propTypes from '../models/propertiesType';
import users from '../models/User';
import validatePropertyRegistration from '../middleware/properties';
import responses from '../helpers/responses';
import jwt from 'jsonwebtoken';
import {Pool, Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const{JWT_SECRET} = process.env;
const{ CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET}=process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const {DATABASE_URL} = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString
})

client.connect()
// Fetch all properties
export const getAllproperties = (req, res) => {
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
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
        //Searching type id by user
    let searchProperties = await client.query('SELECT * FROM properties WHERE id=$1',[
      req.params.id,
    ]);
    
    if(searchProperties.rows.length>0){
      return responses.response(res, 200, searchProperties.rows);   
    //Join table
  }
  else{
    return responses.response(res, 404, 'No Properties found',true);
  }
  
};

// Get property by type
export const getPropertiesByType = async(req, res) => {
  const { type } = req.params;
      //Searching type provided by user
    let searchProperties = await client.query('SELECT * FROM properties WHERE type=$1',[
      req.params.type,
    ]);
    
    if(searchProperties.rows.length>0){
      return responses.response(res, 200, searchProperties.rows);   
    //Join table
  }
  else{
    return responses.response(res, 404, 'No Properties found on the given type',true);
  }

  
};



export const createProperty = async(req, res) => {
    const { errors, isValid } = validatePropertyRegistration(req.body);
  // check validation
  if (!isValid) {
    return responses.response(res, 400, errors);
  }
  else{
            //Decoding token to receive Owner Id
    const tokens = req.headers['authorization'];
    const token = tokens.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const {
      owner, price, state, city, address, type,
    } = req.body;
  
    if (!req.files.image) {
      return responses.response(res, 400, 'Image field is required',true);
    }
    //Search Property
    let propertyCheck = await client.query('SELECT * FROM properties WHERE owner=$1 AND price=$2 AND state=$3 AND city=$4 AND address=$5 and type=$6',[
      decoded.id, req.body.price, req.body.state, req.body.city, req.body.address, req.body.type,
    ]);
    if (propertyCheck.rows.length > 0) {
      return responses.response(res, 302, 'Property already registered', true);
    }
    else{
          const image = req.files.image.path;
        cloudinary.uploader.upload(image, (result, error) => {
          if (error) {
            return responses.response(res, 404, error, true);
          }
          else{
              const tobeSent = {
                status: 'available',
                price,
                state,
                city,
                address,
                type,
                created_on: moment().format(),
                image_url: result.url,
              };
      //Save to Postgres
      let recordprop = client.query('INSERT INTO properties(owner,status, price,state, city, address, type, created_on, image_url)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[
        decoded.id, 'available', req.body.price, req.body.state, req.body.city,req.body.address,req.body.type,moment().format(),result.url,
      ]);
      if (!recordprop){
        return responses.response(res, 404, 'Error running query',true);
      }else{
        return responses.response(res, 201, 'Property recorded',tobeSent, false);
      done();
      }
      //End save to postgress
    }
    });
  }
}
};
//Delete property
export const deleteProperty = async(req, res) => {

  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, JWT_SECRET)  
  const { id } = req.params;
  let findProperty = await client.query('SELECT * FROM properties WHERE id=$1',[
    req.params.id,
  ]);
  if(findProperty.rows.length>0){
      if(decoded.id === findProperty.rows[0].owner) {
        let recordprop = client.query('DELETE FROM properties WHERE id =$1',[
          req.params.id
         ]);
         if (recordprop){
          return responses.response(res, 200, 'Property deleted', false);
          done();
         }
    }else{
      return responses.response(res, 404, 'You do not have the Authorization to Delete this property',true);
    }
  }
  else{
    return responses.response(res, 404, 'No property found',true);
  }

};




//Mark property as sold
export const propertyIsSold = async(req, res) => {
  
  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, JWT_SECRET)  
  const { id } = req.params;
  let findProperty = await client.query('SELECT * FROM properties WHERE id=$1',[
    req.params.id,
  ]);
  if(findProperty.rows.length>0){
    
      if(decoded.id === findProperty.rows[0].owner) {
        let updateprop = client.query('UPDATE properties SET status=$1 where id = $2',[
          'sold',req.params.id,
         ])
         findProperty.rows[0].status = 'sold';
        return responses.response(res,200,findProperty.rows[0],false);
    }else{
      return responses.response(res, 404, ' You do not have the Authorization to make changes to this property',true);
    }
 
  }
  else{
    return responses.response(res, 404, 'No property found',true);
  }
  
};







//Update Property
export const updateProperty = async (req, res) => {
  //Check Authorization
  const tokens = req.headers['authorization']
  const token = tokens.split(' ')[1]
  const decoded = jwt.verify(token, JWT_SECRET)  
  const { id } = req.params;
  let property = await client.query('SELECT * FROM properties WHERE id=$1',[
    req.params.id,
  ]);
  const DBInfo = {
    owner:property.rows[0].owner,
    status: property.rows[0].status,
    price: property.rows[0].price,
    state: property.rows[0].state,
    city: property.rows[0].city,
    address: property.rows[0].address,
    type: property.rows[0].type,
    image: property.rows[0].image_url,
  }
  

  if (property.rows.length>0) {
    const{state} = req.body;
    const{city} = req.body;
    const{address} = req.body;
    const{type} = req.body;
    const{image} = req.body;
    const{price} =req.body;
    if(price){

      if(price<=0){
        return responses.response(res, 404, 'The price can not be less than or equal to 0', true);    
      }
      DBInfo.price =price;
    }
    if(state){
      DBInfo.state =state;
    }
    if(type){
      DBInfo.type =type;
    }
    if(city){
      DBInfo.city =city;
    }
    if(address){
      DBInfo.address =address;
    }
    if(image){
      const img = req.files.image.path;
      cloudinary.uploader.upload(img, (result, error) => {
        if (error) {
          return responses.response(res, 404, error, true);          
        }
        else{
          DBInfo.image =result.url;
        }
      });
    }
    if(state){
      DBInfo.state =state;
    }
    if(decoded.id === property.rows[0].owner) {
//UPDATE here
let updateprop = client.query('UPDATE properties SET price=$1, state=$2, city=$3, address=$4, type=$5, created_on=$6, image_url=$7 where id = $8',[
  DBInfo.price,DBInfo.state,DBInfo.city,DBInfo.address,DBInfo.type,moment().format(),DBInfo.image,req.params.id,
 ])
 if(updateprop){
  return responses.response(res,201,DBInfo, false);
 }
    
  }else{
    return responses.response(res, 404, ' You do not have the Authorization to Delete this property',true);
  }
  }
  else{
    return responses.response(res, 404, 'No property found', true);
  }
};

