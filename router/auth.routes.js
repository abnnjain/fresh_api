const express = require('express');
const router = express.Router();
const authCont = require('../controllers/auth.controller');

router.post('/register', authCont.reg); //for rgistration route call

router.post('/login', authCont.login); //for login route call

router.post('/logout', authCont.logout); //for logout route call

module.exports = router;