import responses from '../helpers/responses';
import users from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const{JWT_SECRET} = process.env;
const decode = {

   async verifyToken(req, res, next) {
       try {
           const tokens = req.headers['authorization']
           const token = tokens.split(' ')[1]
           const decoded = jwt.verify(token, JWT_SECRET)
           const {email}=req.body;
           const user  = users.filter(user => user.email === email);
           req.user = user
           if (!user) {
               responses.response(res,400,'invalid token please sign up')
           }
           next()
       }
       catch (error) {
        responses.response(res,400,'Please provide a valid token')
       }
   }
}
export default decode;