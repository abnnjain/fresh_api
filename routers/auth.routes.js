const express = require('express');
const router = express.Router();
const authCont = require('../controllers/auth.controller');
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
// router.post('/', async (req,res,next)=>{
//     res.status(200).json({
//         status: 200,
//         message : 'auth called in post routes'
//     });
// }); 

router.post('/register',upload.single('profileImage'), authCont.reg); //for rgistration route call

router.post('/login', authCont.login); //for login route call

router.get('/logout', authCont.logout); //for logout route call

module.exports = router;