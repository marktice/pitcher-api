const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('what up');
});

app.listen('1337', () => {
  console.log('server started on port 1337');
});
