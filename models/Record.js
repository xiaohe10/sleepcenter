/**
 * Created by xiaohe on 2017/2/15.
 */


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user')

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Record', new Schema({
    doctor: {type: Schema.Types.ObjectId, ref: 'User'},
    patient:{type: Schema.Types.ObjectId, ref: 'Patient'},
    content: String,
    created: { type: Date, default: Date.now },
}));
