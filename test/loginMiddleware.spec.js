import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import users from '../server/models/User';
import propertiesValidator from '../server/MIDDLEWARE/login';
const should = chai.should();
chai.use(chaiHttp);
chai.should();

