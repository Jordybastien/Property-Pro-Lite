//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import properties from '../server/models/Property';
import propertiesController from '../server/controllers/properties';
import propertiesValidator from '../server/MIDDLEWARE/properties';
import Responding from '../server/helpers/responses';
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
      it('should return a specific property as requested', done => {
        chai
          .request(app)
          .get('/api/v1/properties/1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data').be.a('object');
            // res.body.should.have.property('data').eql(properties[0]);
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
      it('should return  properties by type', done => {
        chai
          .request(app)
          .get('/api/v1/getProperty?type=2 bedroom')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data').be.a('array');
            done();
          });
      });

      
  
  });

