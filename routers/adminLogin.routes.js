const express = require('express');
const router = express.Router();
const admLogCont = require('../controllers/adminLogin.controller');
const multer = require('multer');
const path = require('path')

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,path.join(__dirname,'../uploads/images'), function(error, success){
        if (error) throw new Error("Multer Problem")
      })
    }, 
    filename: (req, file, cb) =>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
  });
  const upload = multer ({storage: storage});

router.post('/register', upload.single('profileImage'), admLogCont.reg);

router.post('/login', admLogCont.login);

router.get('/users', admLogCont.getUsers);

router.get('/users/download', admLogCont.downloadUsers);

router.get('/login', admLogCont.logout);

module.exports = router;