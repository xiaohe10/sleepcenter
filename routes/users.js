var express = require('express');
var router = express.Router();
// var User = require('../models/user');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.post('/login_after', function(req, res, next) {
  console.log(req);
  res.redirect('/patientlist')
});

router.get('/logout', function(req, res, next) {
  console.log(req);
  res.redirect('/users/login')
});
module.exports = router;
