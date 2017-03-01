var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');
var Record = require('../models/Record');

function isAuthenticated(req, res, next) {

  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.isAuthenticated())
    return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/users/login');
}

router.get('/',isAuthenticated,function(req,res,next){
  res.redirect('/patientlist')
});

/* GET home page. */
router.get('/patientlist',isAuthenticated,function(req,res,next){
  Patient.find().sort({created:-1}).exec(function(err,patients){
    if(err){
      res.render('error', { error: err});
    } else{
      // console.log(patients);
      res.render('patientlist', { title: '病人列表',patients:patients,username:req.user.username});
    }
  })

});
router.get('/medical_record', isAuthenticated,function(req, res, next) {
  patientid = req.query.patientid;
  Patient.findOne({_id:patientid}).exec(function(err,patient){
    if(err){
      res.render('error', { error: err});
    }else{
      res.render('medical_record_new', { title: '综合病历记录表',patientid:patientid,patientname:patient.name,username:req.user.username});
    }
  });

});
router.get('/history',isAuthenticated, function(req, res, next) {
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
          res.render('history', { title: '历史记录',patientid:patientid,patientname:patient.name,records:records,username:req.user.username});
        }

      });
    }

  })


});
router.post('/addpatient', isAuthenticated,function(req, res, next) {
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
router.post('/create_record', isAuthenticated,function(req, res, next) {
  patientid = req.body.patientid;
  record_json = req.body;
  // console.log(record_json);
  record = new Record();
  record.content = JSON.stringify(record_json);
  record.patient = patientid;
  record.save(function(err){
    if(!err){
      //profile update
      Patient.update({_id:patientid},{$set:{profile:JSON.stringify(record_json)}},function(err){
        if(!err){
          res.redirect('/history?patientid='+patientid);
        }else{
          console.log(err);
          res.render('error', { error: err});
        }
      })

    }else{
      res.render('error', { error: err});
    }
  })



});
router.get('/record_json',isAuthenticated,function(req,res,next){
  recordID = req.query.recordID;
  Record.findOne({_id:recordID},function(err,record){
    if(err){
      res.render('error', { error: err});
    }else{
      res.json(record);
    }
  })
});
router.get('/profile_json',isAuthenticated,function(req,res,next){
  patientid = req.query.patientid;
  Patient.findOne({_id:patientid},function(err,patient){
    if(err){
      res.render('error', { error: err});
    }else{
      res.json(patient);
    }
  })
});
router.get('/record',isAuthenticated,function(req,res,next){
  recordID = req.query.id;
  patientid = req.query.patientid;
  Patient.findOne({_id:patientid}).exec(function(err,patient) {
    if (err) {
      res.render('error', {error: err});
    } else {
      res.render('record',{patientid:patientid,recordID:recordID,patientname:patient.name,'title':'历史记录 ',username:req.user.username});
    }
  });

})

router.get('/deletepatient',isAuthenticated,function(req,res,next){
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
