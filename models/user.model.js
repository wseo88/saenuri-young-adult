const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
  lastUpdated: { type: Date, default: Date.now },
});

// // Virtual for Member's full name
// UserSchema
// .virtual('fullName')
// .get(function () {
//   return this.name.first + ' ' + this.name.last;
// });

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);
