var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate')
var validate = require('mongoose-validator')
//for back end validator, below is the example for regular expression
var emailValidator = [
  validate({
    validator:'matches',
    arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message:'Must be a valid email address'
  })
];
//there is another way to validate email: simply validator:'isEmail', 'isLength'
var UserSchema = new Schema ({
  'google.id' : {type: String, lowercase: true, unique: true},
  userName: {type: String, required: true, lowercase: true, unique: true},
  password: {type: String},
  email: {type: String, required: true, lowercase: true, unique: true, validate: emailValidator}
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

