const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  title: String,
  description: String,
  imageURL: String,
  companyURL: String,
  budget: Number
});

const Job = mongoose.model('Job', JobSchema);

module.exports = { Job };
