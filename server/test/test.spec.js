//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');
let should = chai.should();


chai.use(chaiHttp);
/*
  * Test the /GET route
  */
  describe('/GET properties', () => {
      it('it should GET all the properties', (done) => {
        chai.request(server)
            .get('/api/v1/getProperties')
            .end((err, res) => {
                  res.should.have.status(200);
                  // res.body.should.be.a('array');
                  // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

