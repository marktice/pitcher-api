const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const { Job } = require('./models/Job');
const { User } = require('./models/User');
const { authenicate } = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

// Job Routes
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send({ jobs });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.get('/jobs/me', authenicate, async (req, res) => {
  try {
    const jobs = await Job.find({ _creator: req.user._id });
    res.status(200).send({ jobs });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.get('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);
    res.status(200).send({ job });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.post('/jobs', authenicate, async (req, res) => {
  const { title, description, imageURL, companyURL, budget } = req.body;
  const _creator = req.user._id;
  const newJob = new Job({
    _creator,
    title,
    description,
    imageURL,
    companyURL,
    budget
  });

  try {
    const job = await newJob.save();
    if (!job) {
      throw new Error('Could not save');
    }
    res.status(200).send({ job });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne(email)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.delete('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findByIdAndRemove(id);
    res.status(200).send({ job });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// User Routes
app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password
  });

  try {
    const user = await newUser.save();
    if (!user) {
      throw new Error('Could not create user');
    }
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send({ user });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const user = req.user;
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send({ user });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.get('/users', authenicate, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error('Could not create user');
    }
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.get('/users/me', authenicate, async (req, res) => {
  res.send({ user: req.user });
});

// Server
app.listen('1337', () => {
  console.log('server started on port 1337');
});
