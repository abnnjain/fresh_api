const User = require('../models/user.model');
const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname,'../public/styles/admin-dashboard.css');

module.exports = {
  reg: async (req, res, next) => {
    try {
        const result = //req.body
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.file.filename
        };
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist)
          throw new Error(`${result.email} has already been registered.`);
        // Save the user to the database
        const user = new User(result);
        const savedUser = await user.save();
        if (savedUser) {
          console.log("User registered Successfully");

          return res.send({
            success: true,
            data: savedUser,
            message: "User registered successfully",
          });
        }
        console.log("Registration Failed");
        return res.send({
          success: false,
          message: "Error in saving the data",
        });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).send({ success: false, message: "Error occurred during registration" });
    }
  },

  login: async(req,res,next) => {
    try {
        const result =  /*await (req.body) req.body*/ 
        {
          email: req.body.email,
          password: req.body.password
        } //taking the input
        const user = await User.findOne({email: result.email}) //checking the email in db
        if(!user) throw new Error('User NOT FOUND'); 
        const isMatch = await user.isValidPassword(result.password) //verifying the password from db
        if(!isMatch) throw new Error('Password not Valid')/*createError.Unauthorized('Password not valid')*/
        const imagePath = path.join(__dirname,'../uploads/images/',user.profileImage);
        fs.stat(imagePath, (err, stats) => {
        if (err) {
          console.error('Error occurred while checking file permissions:', err);
        return;
        }
        console.log('File permissions:', stats.mode.toString(8));
        });
        const filePath = path.join(__dirname,'../uploads/images/',user.profileImage)
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error('File does not exist:', filePath);
            return;
          }
          console.log('File exists:', filePath);
        });
        if (user){
          console.log("User Loggedin successfully");
        return res.send({success: true, data: user, message: "user login successfully"})
            }
            console.log("Login Failed");
        return res.send({success : false, message: "error something"})
    } catch (error) {
      console.error("Error occurred during logging in:", error);

      return res.status(500).send({ success: false, message: "Error occurred during logging in" });
    }
  },

  logout: async(req,res,next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error occurred during logout:", err);
          return res.status(500).send({ success: false, message: "Error occurred during logout" });
        }
        console.log("User logged out successfully");
        return res.send({ success: true, message: "User logged out successfully" });
      });
    } catch (error) {
        next(error)
    }
  },
};