import responses from '../helpers/responses';
import users from '../models/User';
const jwt = require('jsonwebtoken')
// const { Response } = require('../helpers/utils')
// const userResponse = new (Response)


const decode = {

   async verifyToken(req, res, next) {


       try {
           const bearerHeader = req.headers['authorization']
           const token = bearerHeader.split(' ')[1]
           const decoded = jwt.verify(token, 'rugumbira')
           const {email}=req.body;
           const user  = users.filter(user => user.email === email);
           req.user = user
           if (!user) {
               responses.response(res,400,'invalid token please sign up',true)
           }
           next()




       }
       catch (error) {
        responses.response(res,400,'Please provide a valid token',true)
       }


   }
}

export default decode;