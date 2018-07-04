const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: String,
  description: String,
  imageURL: String,
  companyURL: String,
  budget: Number
});

const Job = mongoose.model('Job', JobSchema);

module.exports = { Job };
