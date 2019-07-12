const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import users from '../models/User';
const opts= {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'rugumbira';
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        // User.findById(jwt_payload.id)
        // .then(user =>{
        //     if(user){
        //         return done(null, user);
        //     }
        //     return done(null, false);
        // })
        // .catch(err => console.log(err));

        //const findProperty = users.find(property => property.id == id);



    }));
};
