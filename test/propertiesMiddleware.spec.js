import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import jwt from 'jsonwebtoken';
import propertiesValidator from '../server/MIDDLEWARE/properties';
const should = chai.should();
chai.use(chaiHttp);
chai.should();


describe('POST /', () => {
    it('New property, it should return 400', done => {
        const property ={
            owner: '',
            price: '',
            state:'',
            city: '',
            address: '',
            type:'',
            image_url:''
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
            .send(property)
            .end((err, res) => {
                expect(res.status).to.equal(400);
              done();
    });
  })
});