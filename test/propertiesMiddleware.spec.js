// import chai, {expect} from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../server/index';
// import propertiesValidator from '../server/MIDDLEWARE/properties';
// const should = chai.should();
// chai.use(chaiHttp);
// chai.should();


// describe('POST /', () => {
//     it('User login, it should return 201', done => {
//         const user ={
//             email: 'user2@gmail.com',
//             password: '123456',
//         };
//         chai.request(app)
//             .post('/api/v1/login')
//             .send(user)
//             .end((err, res) => {
//                 expect(res.status).to.equal(201);
//               done();
//     });
//   })
// });