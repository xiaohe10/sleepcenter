var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');
var Record = require('../models/Record');

router.get('/',function(req,res,next){
  res.redirect('/patientlist')
});

/* GET home page. */
router.get('/patientlist',function(req,res,next){
  Patient.find().sort({created:-1}).exec(function(err,patients){
    if(err){
      res.render('error', { error: err});
    } else{
      // console.log(patients);
      res.render('patientlist', { title: '病人列表',patients:patients});
    }
  })

});
router.get('/medical_record', function(req, res, next) {
  patientid = req.query.patientid;
  Patient.findOne({_id:patientid}).exec(function(err,patient){
    if(err){
      res.render('error', { error: err});
    }else{
      res.render('medical_record_new', { title: '综合病历记录表',patientid:patientid,patientname:patient.name});
    }
  });

});
router.get('/history', function(req, res, next) {
  patientid = req.query.patientid;
  //{patient:patient}
  Patient.findOne({_id:patientid}).exec(function(err,patient){
    if(err){
      res.render('error', { error: err});
    }else{
      Record.find({patient:patientid}).sort({created:-1}).exec(function(err,records){
        if(err){
          res.render('error', { error: err});
        }else{
          // console.log(records);
          res.render('history', { title: '历史记录',patientid:patientid,patientname:patient.name,records:records});
        }

      });
    }

  })


});
router.post('/addpatient', function(req, res, next) {
  patientname = req.body.patientname;
  patient = new Patient();
  patient.name = patientname;
  patient.save(function(err){
    if(err){
      res.render('error', { error: err});
    }else{
      res.redirect('/patientlist');
    }
  })
});
router.post('/create_record', function(req, res, next) {
  patientid = req.body.patientid;
  record_json = req.body;
  // console.log(record_json);
  record = new Record();
  record.content = JSON.stringify(record_json);
  record.patient = patientid;
  record.save(function(err){
    if(!err){
      res.redirect('/history?patientid='+patientid);
    }else{
      res.render('error', { error: err});
    }
  })
});
router.get('/record_json',function(req,res,next){
  recordID = req.query.recordID;
  Record.findOne({_id:recordID},function(err,record){
    if(err){
      res.render('error', { error: err});
    }else{
      res.json(record);
    }
  })
});
router.get('/record',function(req,res,next){
  recordID = req.query.id;
  patientid = req.query.patientid;
  Patient.findOne({_id:patientid}).exec(function(err,patient) {
    if (err) {
      res.render('error', {error: err});
    } else {
      res.render('record',{patientid:patientid,recordID:recordID,patientname:patient.name,'title':'历史记录 '});
    }
  });

})

router.get('/deletepatient',function(req,res,next){
  patientid = req.query.patientid;
  Patient.remove({_id:patientid},function(err){
    if (err) {
      // console.log(err);
      res.render('error', {error: {status:'',stack:''},message:'删除失败'});
    }
    else {
      res.redirect('/patientlist');
    }
  });
})
module.exports = router;
