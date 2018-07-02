const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const jobs = [
  {
    _id: 1,
    title: 'Mow my lawn',
    description: 'Its really long, halp me!',
    imageURL:
      'https://www.rainbowlawncare.com/wp-content/uploads/2017/02/RLC-no-mow-guy-350x216.jpg',
    companyURL: 'https://www.rainbowlawncare.com/lawn-types/no-mow/',
    budget: 500
  },
  {
    _id: 2,
    title: 'Kill neighbors cat',
    description: 'Please, he keeps looking at me',
    imageURL: 'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
    companyURL: 'https://www.killmycat.com.au',
    budget: 3.5
  }
];

app.use(bodyParser());

app.get('/jobs', (req, res) => {
  res.status(200).send({ jobs });
});

app.get('/jobs/:id', (req, res) => {
  const id = req.params.id;
  const job = jobs[id - 1];
  res.status(200).send(job);
});

app.post('/jobs', (req, res) => {
  const job = req.body;
  res.status(200).send({ job });
});

app.listen('1337', () => {
  console.log('server started on port 1337');
});
