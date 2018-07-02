const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const { Job } = require('./models/Job');

const app = express();

app.use(bodyParser.json());

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
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

app.post('/jobs', async (req, res) => {
  const { title, description, imageURL, companyURL, budget } = req.body;
  const newJob = new Job({
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

app.delete('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findByIdAndRemove(id);
    res.status(200).send({ job });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.listen('1337', () => {
  console.log('server started on port 1337');
});
