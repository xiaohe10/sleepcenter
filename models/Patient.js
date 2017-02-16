/**
 * Created by xiaohe on 2017/1/21.
 */


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Patient', new Schema({
    name: String,
    created: { type: Date, default: Date.now },
}));