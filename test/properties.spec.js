import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import properties from '../server/models/Property';
import propertiesController from '../server/controllers/properties';
import Responding from '../server/helpers/responses';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const should = chai.should();


chai.use(chaiHttp);
chai.should();

  describe('/GET properties', () => {
      it('it should GET all the properties', (done) => {
        chai.request(app)
            .get('/api/v1/getProperties')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data').be.a('array');
                  res.body.should.have.property('data').eql(properties);
              done();
            });
      });
      it('it should return a specific property as requested', done => {
        chai
          .request(app)
          .get('/api/v1/properties/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data').be.a('object');
            done();
          });
      });
      it('should return 404 when  specified property is not found!', done => {
        chai
          .request(app)
          .get('/api/v1/property/100')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
      it('should return properties by type', done => {
        chai
          .request(app)
          .get('/api/v1/getProperty/2 Bedroom')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data').be.a('object');
            done();
          });
      });
      it('should return 404 when specified type doesnt exist', done => {
        chai
          .request(app)
          .get('/api/v1/getProperty/2 Bedrooms')
          .end((err, res) => {
            res.should.have.status(404);
            // res.body.should.have.property('data').be.a('object');
            done();
          });
      });     
  
  });
  //testing
  describe('PATCH /', () => {
    it('it should fail to update property after receiving wrong information about property', done => {
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v1/updateProperty/100')
        .set('Authorization',userToken)
        .send({
          price: 1000
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('it should fails with errors if you dont meet required properties', done => {
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v1/updateProperty/1')
        .set('Authorization',userToken)
        .send({
          prices: 1000
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('it should update specific property after receiving right property', done => {
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v1/updateProperty/1')
        .set('Authorization',userToken)
        .send({
          price: 100
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

  });

  //End
  describe('POST /', () => {
    it('New property, it should return 201', done => {
        const user ={
            owner: 1,
            price: 100,
            state:'kigali',
            city: 'Kigali',
            address: 'kicukiro',
            type:'2 Bedroom',
            image_url:'http://res.cloudinary.com/dodfpnbik/image/upload/v1562973762/oadrd17vlduu84t1o2ql.jpg'
        };
        const toBeSigned = {
          id: 2,
          email:'user2@gmail.com',
          first_name:'NIYONSENGA',
          last_name:'Eric',
          phoneNumber:'+250780000000',
          address:'Singapore',
          is_admin: false,
        };
        const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
        chai.request(app)
            .post('/api/v1/postProperty')
            .set('Authorization',userToken)
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(500);
              done();
    });
  })
});








describe('POST /', () => {
  it('It should not add property if price is not valid', done => {
      const user ={
          owner: 1,
          price: -100,
          state:'kigali',
          city: 'Kigali',
          address: 'kicukiro',
          type:'2 Bedroom',
          image_url:'http://res.cloudinary.com/dodfpnbik/image/upload/v1562973762/oadrd17vlduu84t1o2ql.jpg'
      };
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai.request(app)
          .post('/api/v1/postProperty')
          .set('Authorization',userToken)
          .send(user)
          .end((err, res) => {
              expect(res.status).to.equal(500);
            done();
  });
})
});






describe('PATCH /', () => {
  it('It should not update property if the price is less or equal to 0', done => {
      const user ={
          price: -5,
      };
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai.request(app)
          .patch('/api/v1/updateProperty/1')
          .set('Authorization',userToken)
          .send(user)
          .end((err, res) => {
              expect(res.status).to.equal(404);
            done();
  });
})
});

  describe('DELETE /', () => {
    it('it should return 200 status when delete operation was successful', done => {
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v1/deleteProperty/1')
        .set('Authorization',userToken)
        .end((err, res) => {          
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should return 404 with error when deletion fails', done => {
      const toBeSigned = {
        id: 2,
        email:'user2@gmail.com',
        first_name:'NIYONSENGA',
        last_name:'Eric',
        phoneNumber:'+250780000000',
        address:'Singapore',
        is_admin: false,
      };
      const userToken = 'Bearer ' + jwt.sign(toBeSigned, 'rugumbira', { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v1/deleteProperty/500')
        .set('Authorization',userToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

