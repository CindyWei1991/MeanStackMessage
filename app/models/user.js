var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new Schema ({
  'google.id' : {type: String, lowercase: true, unique: true},
  userName: {type: String, required: true, lowercase: true, unique: true},
  password: {type: String},
  email: {type: String, required: true, lowercase: true, unique: true}
});
UserSchema.plugin(findOrCreate);
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

