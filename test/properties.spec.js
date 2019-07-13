import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import properties from '../server/models/Property';
import propertiesController from '../server/controllers/properties';
import propertiesValidator from '../server/MIDDLEWARE/properties';
import Responding from '../server/helpers/responses';
import sinon from 'sinon';
const should = chai.should();


chai.use(chaiHttp);
chai.should();
/*
  * Test the /GET route
  */
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
            // res.body.should.have.property('error').be.a('string');
            // res.body.should.have.property('error').eql('No Properties found');
            done();
          });
      });
    //   it('should return properties by type', done => {
    //     chai
    //       .request(app)
    //       .get('/api/v1/getProperty?type=2 bedroom')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.have.property('data').be.a('array');
    //         done();
    //       });
    //   });

      
  
  });
  // describe('PATCH /', () => {
  //   // it('it should return 404 after failed to updated specific property', done => {
  //   //   chai
  //   //     .request(app)
  //   //     .patch('/api/v1/updateProperty/100')
  //   //     .send({
  //   //       price: 1000
  //   //     })
  //   //     .end((err, res) => {
  //   //       res.should.have.status(404);
  //   //       res.body.should.have
  //   //         .property('error')
  //   //         .eql('property your are trying to update is not available!');
  //   //       done();
  //   //     });
  //   // });
  //   // it('it should fails with errors if you dont meet required properties', done => {
  //   //   chai
  //   //     .request(app)
  //   //     .patch('/api/v1/updateProperty/1')
  //   //     .send({
  //   //       prices: 1000
  //   //     })
  //   //     .end((err, res) => {
  //   //       res.should.have.status(400);
  //   //       res.body.should.have.property('errors').be.a('array');
  //   //       done();
  //   //     });
  //   // });
  //   // it('it should return 200 after successfully updated specific property', done => {
  //   //   chai
  //   //     .request(app)
  //   //     .patch('/api/v1/updateProperty/1')
  //   //     .send({
  //   //       price: 100
  //   //     })
  //   //     .end((err, res) => {
  //   //       res.should.have.status(200);
  //   //       done();
  //   //     });
  //   // });

  //   it('it should mark as sold specified property', done => {
  //     chai
  //       .request(app)
  //       .patch('/api/v1/masProperty/1/sold')
  //       .set('content-type', 'application/json')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have
  //           .property('data')
  //           .be.a('object')
  //           .have.property('status')
  //           .eql('sold');
  //         done();
  //       });
  //   });

  //   it('it should fails to mark property as sold if not available', done => {
  //     chai
  //       .request(app)
  //       .patch('/api/v1/masProperty/100/sold')
  //       .set('content-type', 'application/json')
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.have.property('error').be.eql('No property found');
  //         done();
  //       });
  //   });
  // });
  // describe('POST /', () => {
  //   it('New property, it should return 201', done => {
      
  //   //   sinon.stub(propertiesController, 'createProperty').callsFake(() => {
  //   //     return {
  //   //       status: 201,
  //   //       data: {
  //   //         id: 2,
  //   //         owner: 1,
  //   //         status: 'sold',
  //   //         price: '1000',
  //   //         state: 'Kigali',
  //   //         city: 'Kigali',
  //   //         address: 'Kicukiro',
  //   //         type: '2 bedroom',
  //   //         created_on: '2019-07-02',
  //   //         image_url:
  //   //           'https://res.cloudinary.com/dodfpnbik/image/upload/v1562927036/zthvmkt7rzianhabsgre.jpg'
  //   //       }
  //   //     };
  //   //   });
  //     done();
  //   });
  // });
  // describe('DELETE /', () => {
  //   it('it should return 200 status when delete operation was successful', done => {
  //     chai
  //       .request(app)
  //       .delete('/api/v1/deleteProperty/1')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         // res.body.should.have.property('data').be.a('object');
  //         // res.body.should.have.property('data').have.property('message').be.a('string');
  //         done();
  //       });
  //   });

  //   it('it should return 404 with error when deletion fails', done => {
  //     chai
  //       .request(app)
  //       .delete('/api/v1/deleteProperty/100')
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.have.property('error').be.a('string');
  //         done();
  //       });
  //   });
  // });

