import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/User';
import validateRegInput from '../validations/userRegistration';
import validateLogin from '../validations/login';

export const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const result = users.find(user => user.id == id);
  res.send(result);
};
// Signup
export const createUser = (req, res) => {
  const { errors, isValid } = validateRegInput(req.body);
  // check fields validations
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const {
    email, first_name, last_name, password, phoneNumber, address, is_admin,
  } = req.body;
  // check if user is not yet recorded
  const searchUser = users.filter(item => item.email === email);
  if (searchUser.length > 0) {
    return res.status(401).json({
      status: res.statusCode,
      error: 'User already registered',
    });
  }

  // Record it
  const addUser = {
    id: users.length + 1,
    email,
    first_name,
    last_name,
    password,
    phoneNumber,
    address,
    is_admin: false,
  };
  // Encrypt password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(addUser.password, salt, (err, hash) => {
      addUser.password = hash;
      users.push(addUser);
      return res.status(201).json({
        status: res.statusCode,
        data: addUser,
      });
    });
  });
};
// Login
export const loginUser = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;


  // Login functionality
  // check for user
  const logUser = users.filter(user => user.email === email);
  console.log(logUser);

  if (logUser.length > 0) {
    // check password

    if (bcrypt.compareSync(password, logUser[0].password)) {
      // User matched
      // create JWT payload
      const payload = { id: logUser.id, name: logUser.name };
      const { password,is_admin, ...noA } = logUser;
      // Sign token
      jwt.sign(payload, 'rugumbira', { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token,
          noA,
        });
      });
    } else {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Credentials do not match',
      });
    }
  }
};
