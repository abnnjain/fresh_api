const express = require('express');
const router = express.Router();
const authCont = require('../controllers/auth.controller');

router.post('/', async (req,res,next)=>{
    res.status(200).json({
        status: 200,
        message : 'auth called in post routes'
    });
}); 

router.post('/register', authCont.reg); //for rgistration route call

router.post('/login', authCont.login); //for login route call

router.delete('/logout', authCont.logout); //for logout route call

module.exports = router;