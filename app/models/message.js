var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var validate = require('mongoose-validator')
//for back end validator, below is the example for regular expression
var emailValidator = [
  validate({
    validator:'matches',
    arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message:'Must be a valid email address'
  })
];

/*schema*/
var ObjectId = mongoose.Schema.Types.ObjectId;
//there is another way to validate email: simply validator:'isEmail', 'isLength'
var MessageSchema = new Schema ({
  text: {type: String, required: true},
  category: {type: String, required: true},
  receiver: {type:ObjectId, required: true, ref:'User'},
  sendor: {type: ObjectId, required: true, ref: 'User'},
  dateTime: {type: Date, default: Date.now}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

 /**
 * Methods
 */
module.exports = mongoose.model('Message', MessageSchema);

