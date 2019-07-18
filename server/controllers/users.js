import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/User';
import validateRegInput from '../middleware/userRegistration';
import validateLogin from '../middleware/login';
import responses from '../helpers/responses';
import {Client, Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const{JWT_SECRET} = process.env;
const {DATABASE_URL} = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString
});
client.connect()
// Signup
export const createUser = async (req, res) => {
  const { errors, isValid } = validateRegInput(req.body);
  // check fields validations
  if (!isValid) {
    return responses.response(res,401,errors, true);
  }
    //Check if user is already registered
  const {
    email, first_name, last_name, password, phoneNumber, address, is_admin,
  } = req.body;
  // check if user is not yet recorded
  let userCheck = await client.query('SELECT * FROM users WHERE email=$1 AND first_name=$2 AND last_name=$3 AND phonenumber=$4 AND address=$5 and is_admin=$6',[
    req.body.email, req.body.first_name, req.body.last_name, req.body.phoneNumber, req.body.address, req.body.is_admin,
  ]);
  if (userCheck.rows.length > 0) {
    return responses.response(res,409,'User already registered',true);
  }else{

        //   // Encrypt password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              let newpassword = hash;
                      //Save to Postgres
                      let recordUser = client.query('INSERT INTO users(email, first_name, last_name, password, phonenumber, address, is_admin)VALUES($1,$2,$3,$4,$5,$6,$7)',[
                        req.body.email, req.body.first_name, req.body.last_name, newpassword, req.body.phoneNumber, req.body.address, req.body.is_admin,
                      ]);        
                      if (recordUser){

                        //Constant to be signed in payload without password
                        //  Comeback later UserID to be signed
                          const toBeSigned = {
                            id:1,
                            email,
                            first_name,
                            last_name,
                            phoneNumber,
                            address,
                            is_admin: false,
                          };
                        //Token              
                        jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                          const payload= {
                            token: 'Bearer ' + token,
                            'firstname':req.body.first_name,
                            'lastname':req.body.last_name,
                            'email':req.body.email,
                            'phoneNumber':req.body.phoneNumber,
                            'address':req.body.address,
                          }
                          return responses.response(res,201,'Account created succesfully',payload,false);  
                        });      
                        //done();
                        
                      }else{
                        return responses.response(res, 404, 'Error running query',true);
                      }
                      //End save to postgress

     
            });
          });

  }

  
};
export const loginUser = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  // check validation
  if (!isValid) {
    return res.status(401).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;


  // Login functionality
  // check for user
  let emailCheck = await client.query('SELECT * FROM users WHERE email=$1',[
    req.body.email,
  ]);
  
  if (emailCheck.rows.length > 0) {
    // check password
    
    if (bcrypt.compareSync(password, emailCheck.rows[0].password)) {
      // User matched
      // create JWT payload
            //Token      
            const toBeSignedLogin = {
              id:emailCheck.rows[0].id,
              first_name:emailCheck.rows[0].first_name,
              last_name:emailCheck.rows[0].last_name,
              email:emailCheck.rows[0].email,
              phoneNumber:emailCheck.rows[0].phoneNumber,
              address:emailCheck.rows[0].address,
              is_admin: emailCheck.rows[0].is_admin,
            };
            jwt.sign(toBeSignedLogin, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {

              const payload= {
                token:'Bearer ' + token,
                'firstname':emailCheck.rows[0].first_name,
                'lastname':emailCheck.rows[0].last_name,
                'email':emailCheck.rows[0].email,
                'phoneNumber':emailCheck.rows[0].phoneNumber,
                'address':emailCheck.rows[0].address,
              }
              return responses.response(res,201,payload,false);  
            });
    } else {
      return responses.response(res,401,'Wrong Password', true);
    }
  }
  else {
    return responses.response(res,401,'User doesnt exist', true);
  }
};
