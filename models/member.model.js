const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
    korean: String
  },
  birthday: String,
  address: {
    street: String,
    city: String,
    zipCode: String,
  },
  occupation: String,
  organization: String,
  phone: String,
  email: String,
  shirtSize: String,
  isBaptized: Boolean,
  isInfantBaptized: Boolean
});

// Virtual for Member's full name
MemberSchema
.virtual('fullName')
.get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('Member', MemberSchema);

