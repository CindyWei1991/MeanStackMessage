var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema ({
  userName: {type: String, required: true, lowercase: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, lowercase: true, unique: true}
});
UserSchema.pre('save', function(next) {
  // Store hash in your password DB. 
  var user = this;
  bcrypt.hash(this.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    };
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}; 
module.exports = mongoose.model('User', UserSchema);

