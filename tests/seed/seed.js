const { User } = require('./../../models/User');
const { Job } = require('./../../models/Job');

const users = [
  {
    email: 'user1@test.com',
    password: 'password123'
  },
  {
    email: 'user2@test.com',
    password: 'password123'
  }
];

const populateUsers = async () => {
  try {
    await User.remove();
    await User.create(users);
  } catch (error) {
    return Promise.reject();
  }
};

module.exports = { users, populateUsers };
