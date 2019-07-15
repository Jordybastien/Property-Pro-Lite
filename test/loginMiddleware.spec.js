import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import users from '../server/models/User';
import propertiesValidator from '../server/MIDDLEWARE/login';
const should = chai.should();
chai.use(chaiHttp);
chai.should();


// describe('POST /', () => {
//     it('It shouldnt signup while having an invalid email', done => {
//         const userInfo ={
//             id: users.length + 1,
//             email:'user10gmail.com',
//             first_name:'NIYONSENGA',
//             last_name:'Eric',
//             phoneNumber:'+250780000000',
//             address:'Singapore',
//             is_admin: false,
//         };

//         chai.request(app)
//             .post('/api/v1/login')
//             .send(userInfo)
//             .end((err, res) => {
//                 expect(res.status).to.equal(400);
//                 expect(res.body.error.email).equals("Email is invalid");
//               done();
//     });
//   })



//   it('It shouldnt signup while having an invalid email', done => {
//     const userInfo ={
//         id: users.length + 1,
//         email:'',
//         first_name:'NIYONSENGA',
//         last_name:'Eric',
//         phoneNumber:'+250780000000',
//         address:'Singapore',
//         is_admin: false,
//     };

//     chai.request(app)
//         .post('/api/v1/login')
//         .send(userInfo)
//         .end((err, res) => {
//             expect(res.status).to.equal(400);
//             expect(res.body.error.email).equals("Email Field is required");            
//           done();
// });
// })
// });