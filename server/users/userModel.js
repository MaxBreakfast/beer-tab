var Bluebird = require('bluebird'),
    mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

// Define user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: {
    first: String,
    last: String,
  },
  network: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

UserSchema.methods.comparePassword = function (attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function (err, isMatch) {
    if (err) {
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

// Hash pashword before saving to database
UserSchema.pre('save', function (next) {
  var cipher = Bluebird.promisify(bcrypt.hash);

  return cipher(this.password, null, null).bind(this)
    .then(function (hash) {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('User', UserSchema);
