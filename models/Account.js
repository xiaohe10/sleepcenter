/**
 * Created by xiaohe on 2017/1/21.
 */


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Account =  new Schema({
    name: String,
    password: String,
    realname:String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);