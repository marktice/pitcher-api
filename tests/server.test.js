const request = require('supertest');

const { app } = require('./../server');
const { users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);

describe('GET /jobs', () => {
  test('should return jobs', async (done) => {
    const res = await request(app).get('/jobs');
    expect(res.statusCode).toBe(200);
    expect(res.body.jobs).toBeTruthy();
    done();
  });
});

describe('POST /users', () => {
  test('should create a user', async (done) => {
    const user = {
      email: 'createUser@test.com',
      password: 'password123'
    };
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    done();
  });

  test('should not create a user with same email', async (done) => {
    const user = {
      email: users[0].email,
      password: users[0].password
    };
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.user).toBeFalsy();
    done();
  });

  test('should not create a user with bad input', async (done) => {
    const user = {
      email: '',
      password: ''
    };
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.user).toBeFalsy();
    done();
  });
});

describe('POST /users/login', () => {
  test('it should login a user', async (done) => {
    const user = {
      email: users[0].email,
      password: users[0].password
    };
    const res = await request(app)
      .post('/users/login')
      .send(user);
    expect(res.statusCode).toBe(200);
    expect(res.header['x-auth']).toBeTruthy();
    done();
  });

  test('it should not login a user with wrong password', async (done) => {
    const user = {
      email: users[0].email,
      password: 'badPassword'
    };
    const res = await request(app)
      .post('/users/login')
      .send(user);
    expect(res.statusCode).toBe(400);
    expect(res.header['x-auth']).toBeFalsy();
    done();
  });
});
