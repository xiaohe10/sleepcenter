var express = require('express');
var router = express.Router();
// var User = require('../models/user');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  message = req.query.message;
  res.render('login', { title: '登录',message:message});
});
router.post('/login_after', function(req, res, next) {
  username = req.body.user;
  password = req.body.password;

  console.log(username,password);
  if(username =='doctor' && password=='sleep'){
    res.redirect('/patientlist')
  }else{
    res.redirect('/users/login?message=密码错误')
  }

});

router.get('/logout', function(req, res, next) {
  console.log(req);
  res.redirect('/users/login')
});
module.exports = router;
