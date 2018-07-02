const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  companyURL: String,
  Budget: Number
});

const Job = mongoose.model('Job', JobSchema);

module.exports = { Job };
