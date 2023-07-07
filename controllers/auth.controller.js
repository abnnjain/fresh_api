const User = require('../models/user.model')
const mongoose = require('mongoose');
// const fs = require('fs');
// const multer = require('multer');
// const sharp = require('sharp');
// const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'fresh_api'
})
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((err) => console.log(err.message));

module.exports = {
  reg: async (req, res, next) => {
    try {
        const result = //req.body
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.body.profileImage
        };
        console.log(result, "=> req result");
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist)
          throw new Error(`${result.email} has already been registered.`);
// // Multer configuration
// const storage = multer.memoryStorage({
//     destination: '../uploads/images',
//     filename: (req, file, cb) =>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
// const upload = multer({ storage: storage });

// // Define the route handler for the file upload
// const uploadMiddleware = upload.single('profileImage');
// uploadMiddleware(req, res, async (error) => {
//     if (error instanceof multer.MulterError) {
//       console.error('Multer Error:', error);
//       return res.status(400).send({ success: false, message: 'Error occurred during file upload' });
//     } else if (error) {
//       console.error('Error:', error);
//       return res.status(500).send({ success: false, message: 'Unexpected error occurred during file upload' });
//     }
        // // Base64 encoding
        // const base64str = base64_encode(req.file.buffer);
    //     // Process and convert the image using sharp
    //   const resizedImageBuffer = await sharp(req.file.buffer)
    //   .resize({ width: 500, height: 500 })
    //   .toBuffer();
    // const base64str = resizedImageBuffer.toString('base64');
    //      // Save the base64 image to the database
    //   result.profileImage = base64str;

        // // Save the string image to the database
        // result.profileImage = new User({ profileImage: base64str });
        // console.log(req.body.profileImage);
        // console.log(result);
        // // await stringDocument.save();

        // Save the user to the database
        const user = new User(result);
        const savedUser = await user.save();
        if (savedUser) {
          return res.send({
            success: true,
            data: savedUser,
            message: "User registered successfully",
          });
        }

        return res.send({
          success: false,
          message: "Error in saving the data",
        });
    //   });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return res.status(500).send({ success: false, message: "Error occurred during registration" });
    }
  },

  login: async(req,res,next) => {
    try {
        const result = req.body //taking the input
        const user = await User.findOne({email: result.email}) //checking the email in db
        if(!user) throw new Error('User NOT FOUND'); 
        const isMatch = await user.isValidPassword(result.password) //verifying the password from db
        if(!isMatch) throw res.send('Password not Valid')/*createError.Unauthorized('Password not valid')*/
        if (user){
        return res.send({success: true, data: user, message: "user login successfully"})
            }
        return res.send({success : false, message: "error something"})
    } catch (error) {
        next(error)
    }
  },

  logout: async(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
  },
};

// Define the base64 encoding function
function base64_encode(buffer) {
  // Convert binary data to base64 encoded string
  return Buffer.from(buffer).toString('base64');
}
