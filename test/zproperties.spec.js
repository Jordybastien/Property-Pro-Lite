import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import usersController from '../server/controllers/properties';
import propertiesValidator from '../server/middleware/properties';
import Responding from '../server/helpers/responses';
import sinon from 'sinon';
import { getMaxListeners } from 'cluster';
import { pool } from '../server/controllers/users'
import jwt from 'jsonwebtoken';
const{JWT_SECRET} = process.env;

const should = chai.should();
chai.use(chaiHttp);
chai.should();

describe('Property', () => {
    describe('POST /', () => {
        it('It should not create a property if price is less or equal to 0', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if state field is not filled in', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if price field is empty', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if the inputed value is not numeric', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','ab')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if city field is not filled in', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','Kicukiro')
                .field('city','')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if address field is not filled in', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not create a property if type field is not filled in', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','Kicukiro')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','')
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should create a property if all the fields are provided as demanded', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','100')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                  done();
        });
        })
        it('It should not create a property if it is already registered', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','100')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(409);
                  done();
        });
        })
        it('It should not create a property if the method is wrong', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .get('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','0')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(405);
                  done();
        });
        })
        it('It should not create a property if the image field is empty', done => {

            const image = '';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/postProperty')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('owner',1)
                .field('price','100')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                  done();
        });
        })
    });
    describe('/GET properties', () => {
        it('it should GET all the properties', (done) => {
          chai.request(app)
              .get('/api/v1/allProperties')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
        it('it should not GET all the properties if the method is wrong', (done) => {
            chai.request(app)
                .post('/api/v1/allProperties')
                .end((err, res) => {
                      res.should.have.status(405);
                  done();
                });
          });
        it('it should return a specific property as requested', done => {
          chai
            .request(app)
            .get('/api/v1/properties/1')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
        it('should return 404 when  specified property is not found!', done => {
          chai
            .request(app)
            .get('/api/v1/properties/100')
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
        it('it should not return a specific property as requested if the method is wrong', done => {
            chai
              .request(app)
              .post('/api/v1/properties/1')
              .end((err, res) => {
                res.should.have.status(405);
                done();
              });
          });
        it('should return properties by type', done => {
          chai
            .request(app)
            .get('/api/v1/getProperty/2 Bedroom')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
        it('should not return properties by type if the method is wrong', done => {
            chai
              .request(app)
              .post('/api/v1/getProperty/2 Bedroom')
              .end((err, res) => {
                res.should.have.status(405);
                done();
              });
          });
        it('should return 404 when specified type doesnt exist', done => {
          chai
            .request(app)
            .get('/api/v1/getProperty/2 Bedrooms')
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });     
    
    });
    describe('PATCH /', () => {
        it('It should mark as sold a property', done => {            
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .patch('/api/v1/masProperty/1/sold')
                .set('Authorization',userToken)
                .send()
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                  done();
        });
        })
        it('It should not mark as sold a property if the user does not have the authorization', done => {            
            const toBeSigned = {
              id: 2,
              email:'test1@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .patch('/api/v1/masProperty/1/sold')
                .set('Authorization',userToken)
                .send()
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                  done();
        });
        })
        it('It should update a property', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .patch('/api/v1/updateProperty/1')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('price','100')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                  done();
        });
        })
        it('It should not update a property if the user does not have the authorization', done => {

            const image = '../Property-Pro-Lite/UI/img/properties/2.jpg';
            const toBeSigned = {
              id: 2,
              email:'test2@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .patch('/api/v1/updateProperty/1')
                .set('Authorization',userToken)
                .attach('image', image)
                .field('price','100')
                .field('state','Kigali')
                .field('city','Kigali')
                .field('address','Kicukiro')
                .field('type','2 Bedroom')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                  done();
        });
        })
        it('It should not mark as sold a property if the method is wrong', done => {            
            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/masProperty/1/sold')
                .set('Authorization',userToken)
                .send()
                .end((err, res) => {
                    expect(res.status).to.equal(405);
                  done();
        });
        })
        it('It should not mark as sold a property if the property is not registered', done => {            
          const toBeSigned = {
            id: 1,
            email:'test@gmail.com',
            first_name:'Rugumbira',
            last_name:'Jordy',
            phoneNumber:'0785634779',
            address:'Kicukiro',
            is_admin: false,
          };
          const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
          chai.request(app)
              .patch('/api/v1/masProperty/100/sold')
              .set('Authorization',userToken)
              .send()
              .end((err, res) => {
                  expect(res.status).to.equal(404);
                done();
      });
      })
    });
    describe('DELETE /', () => {
        it('It should delete a property', done => {

            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .delete('/api/v1/deleteProperty/1')
                .set('Authorization',userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                  done();
        });
        })
        it('It should not delete a property if the method is wrong', done => {

            const toBeSigned = {
              id: 1,
              email:'test@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .post('/api/v1/deleteProperty/1')
                .set('Authorization',userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(405);
                  done();
        });
        })
        it('It should not delete a property if user does not have Authorization', done => {

            const toBeSigned = {
              id: 2,
              email:'test20@gmail.com',
              first_name:'Rugumbira',
              last_name:'Jordy',
              phoneNumber:'0785634779',
              address:'Kicukiro',
              is_admin: false,
            };
            const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
            chai.request(app)
                .delete('/api/v1/deleteProperty/1')
                .set('Authorization',userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                  done();
        });
        })
        it('It should not delete a property if the property is not registered', done => {

          const toBeSigned = {
            id: 2,
            email:'test@gmail.com',
            first_name:'Rugumbira',
            last_name:'Jordy',
            phoneNumber:'0785634779',
            address:'Kicukiro',
            is_admin: false,
          };
          const userToken = 'Bearer ' + jwt.sign(toBeSigned, JWT_SECRET, { expiresIn: '24h' });
          chai.request(app)
              .delete('/api/v1/deleteProperty/100')
              .set('Authorization',userToken)
              .end((err, res) => {
                  expect(res.status).to.equal(404);
                done();
      });
      })
    });
    
});