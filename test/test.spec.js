//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
const should = chai.should();


chai.use(chaiHttp);
/*
  * Test the /GET route
  */
  describe('/GET properties', () => {
      it('it should GET all the properties', (done) => {
        chai.request(app)
            .get('/api/v1/getProperties')
            .end((err, res) => {
                  res.should.have.status(200);
                  // res.body.should.be.a('array');
                  // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

