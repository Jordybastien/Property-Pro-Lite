import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import usersController from '../server/controllers/users';
import propertiesValidator from '../server/middleware/properties';
import Responding from '../server/helpers/responses';
import sinon from 'sinon';
import { getMaxListeners } from 'cluster';
import { pool } from '../server/controllers/users'


const should = chai.should();
chai.use(chaiHttp);
chai.should();

describe('User', () => {


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
                    expect(res.body.message.first_name).equals('First Name Field is required');
                  done();
        });
        })
        it('It should not create a user if first name is not a string', done => {
            const user ={
                email: 'user8@gmail.com',
                first_name: '123',
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
                    expect(res.body.message.first_name).equals('First name must be a string');
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
                    
                    expect(res.body.message.last_name).equals('Last Name Field is required');
                  done();
        });
        })
        it('It should not create a user if last name is not a string', done => {
            const user ={
                email: 'user8@gmail.com',
                first_name: 'rugumbira',
                last_name:'123',
                password: '123456',
                phoneNumber: '0785634779',
                address:'Kicukiro'
            };
        
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(400);        
                    
                    expect(res.body.message.last_name).equals('Last name must be a string');
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
                    expect(res.body.message.email).equals('Email is invalid');
                  done();
        });
        })
        it('It should not create a user if email field is empty', done => {
            const user ={
                email: '',
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
                    expect(res.body.message.email).equals('Email is invalid');
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
                    expect(res.body.message.phoneNumber).equals('Phone must be numeric');
                  done();
        });
        })
        it('It should not create a user if phone number is empty', done => {
            const user ={
                email: 'user8gmail.com',
                first_name: 'rugumbira',
                last_name:'jordy',
                password: '123456',
                phoneNumber: '',
                address:'Kicukiro'
            };
        
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message.phoneNumber).equals('Phone must be numeric');
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
                    // expect(res.body.message.address).equals('Address Field is required');
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
        it('It should not create a user if password is empty', done => {
            const user ={
                email: 'user8@gmail.com',
                first_name: 'rugumbira',
                last_name:'jordy',
                password: '',
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
        it('It should create a user with all required fields provided', done => {
            const user ={
                email: 'test@gmail.com',
                first_name: 'Rugumbira',
                last_name:'Jordy',
                password: '123456',
                phoneNumber: '0785634779',
                address:'Kicukiro'
            };
        
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                  done();
        });
        })
        it('It should not create a user if the method is wrong', done => {        
            chai.request(app)
                .get('/api/v1/auth/signup')
                .field('email','user8@gmail.com')
                .field('first_name','Rugumbira')
                .field('last_name','Jordy')
                .field('password','123456')
                .field('phoneNumber','0785634779')
                .field('address','Kicukiro')
                .end((err, res) => {
                    expect(res.status).to.equal(405);
                  done();
        });
        })
        //Login
        it('It should not allow the user to login if the email is invalid', done => {
            const user ={
                email: 'testgmail.com',
                password: '123456',
            };
        
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                  done();
        });
        })
        it('It should not allow the user to login if the password is not more than six charachter', done => {
            const user ={
                email: 'test@gmail.com',
                password: '123',
            };
        
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should not sign in a user if he has the wrong password', done => {
            const user ={
                email: 'test@gmail.com',
                password: '123456789',
            };
        
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                  done();
        });
        })
        it('It should sign in a user if he provides the right credenttials', done => {
            const user ={
                email: 'test@gmail.com',
                password: '123456',
            };
        
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                  done();
        });
        })
    });
});


