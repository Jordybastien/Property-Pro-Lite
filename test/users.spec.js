import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import users from '../server/models/user';
import usersController from '../server/controllers/users';
import propertiesValidator from '../server/middle/properties';
import Responding from '../server/helpers/responses';
import sinon from 'sinon';
import { getMaxListeners } from 'cluster';


const should = chai.should();
chai.use(chaiHttp);
chai.should();
describe('POST /', () => {
  it('It should not create a user if first name is empty', done => {
    const user ={
        email: 'user8@gmail.com',
        first_name: '',
        last_name:'Jordy',
        password: '123456',
        phoneNumber: '0785634779',
        address:'Kicukiro'
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error.first_name).equals('First Name Field is required');
          done();
});
})
it('It should not create a user if last name is empty', done => {
    const user ={
        email: 'user8@gmail.com',
        first_name: 'rugumbira',
        last_name:'',
        password: '123456',
        phoneNumber: '0785634779',
        address:'Kicukiro'
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);        
            
            expect(res.body.error.last_name).equals('Last Name Field is required');
          done();
});
})
it('It should not create a user if email is not valid', done => {
    const user ={
        email: 'user8gmail.com',
        first_name: 'rugumbira',
        last_name:'jordy',
        password: '123456',
        phoneNumber: '0785634779',
        address:'Kicukiro'
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error.email).equals('Email is invalid');
          done();
});
})




it('It should not create a user if phone number is not valid', done => {
    const user ={
        email: 'user8gmail.com',
        first_name: 'rugumbira',
        last_name:'jordy',
        password: '123456',
        phoneNumber: 'asdasd',
        address:'Kicukiro'
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error.phoneNumber).equals('Phone must be numeric');
          done();
});
})





it('It should not create a user if address is not provided', done => {
    const user ={
        email: 'user8gmail.com',
        first_name: 'rugumbira',
        last_name:'jordy',
        password: '123456',
        phoneNumber: 'hjkhk',
        address:''
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.error.address).equals('Address Field is required');
          done();
});
})



it('It should not create a user if password is not valid', done => {
    const user ={
        email: 'user8@gmail.com',
        first_name: 'rugumbira',
        last_name:'jordy',
        password: '123',
        phoneNumber: '0785634779',
        address:'Kicukiro'
    };

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400);
          done();
});
})
});
