var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  res.redirect('/patientlist')
});

/* GET home page. */
router.get('/patientlist',function(req,res,next){
  res.render('patientlist', { title: '病人列表' });
});
router.get('/medical_record', function(req, res, next) {
  patientname = req.query.patientname;
  res.render('medical_record_new', { title: '综合病历记录表',patientname:patientname});
});
router.get('/history', function(req, res, next) {
  patientname = req.query.patientname;
  res.render('history', { title: '历史记录',patientname:patientname});
});
router.get('/register', function(req, res, next) {
  patientname = req.query.patientname;
  res.render('register', { title: '信息登记',patientname:patientname});
});
router.get('/tables', function(req, res, next) {
  table_name = req.query.table_name;
  patientname:patientname;
  res.render(table_name, { title: table_name,patientname:patientname});
});

router.get('/submit', function(req, res, next) {
  res.render('medical_record_new', { title: '综合病历记录表',patientname:patientname});
});
module.exports = router;
