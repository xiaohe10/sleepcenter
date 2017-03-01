var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/Account');
function isAuthenticated(req, res, next) {

  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.isAuthenticated())
    return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/users/login');
}

router.get('/doctors',function(req,res){
  message = req.query.message
  Account.find().sort({created:-1}).exec(function(err,doctors){
    if(err){
      res.render('error', { error: err});
    } else{
      // console.log(patients);
      res.render('doctors', { title: '医生管理',doctors:doctors,message:message,username:'test'});
    }
  })
})
router.get('/deletedoctor',isAuthenticated,function(req,res,next){
  doctorid = req.query.doctorid;
  Account.remove({_id:doctorid},function(err){
    if (err) {
      // console.log(err);
      res.redirect('/users/doctors?message=删除失败')
    }
    else {
      res.redirect('/users/doctors?message=删除成功')
    }
  });
})
/* GET users listing. */
router.get('/login', function(req, res) {
  message = req.query.message;
  res.render('login', { user : req.user,title: '登录',message:message });
});

router.post('/login', function(req, res,next) {
  passport.authenticate('local',function(err,user,info){
    if(err){
      return next(err); // will generate a 500 error
    }
      if(!user){
        return res.redirect('/users/login?message=用户名或密码不正确')
      }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/patientlist');
  });
  })(req, res, next);
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

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      res.redirect('/users/doctors?message=已经存在此医生')
      console.log(err);
    }
    else{
      res.redirect('/users/doctors?message=添加成功')
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/users/login')
});
module.exports = router;
