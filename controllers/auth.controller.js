const User = require('../models/user.model')
const fs = require('fs');

module.exports = {
    reg: async(req,res,next) => {
        try {
            const result = await (req.body);
            console.log(result);
            // const doesExist = await User.findOne({email: result.email});
            // if (doesExist) throw new Error(`${result.email} has already been registered login with this email`);
            // function base64_encode(file) {
            //     // read binary data
            //     const bitmap = fs.readFileSync(file);
            //     // convert binary data to base64 encoded string
            //     return Buffer.from(bitmap).toString('base64');
            // }
            // var base64str = base64_encode({profileImage: result.profileImage});
            // const stringDocument = new User({ stringField: base64str });
            // await stringDocument.save()
            // .then((stringDocument) => {
            //     console.log('String image saved:', stringDocument.id);
            // })
            // .catch((error) => {
            //     console.error('Error saving string:', error);
            // });
            const user = new User (result);
            const savedUser = await user.save();
            if (user){
                return res.send({success: true, data: savedUser,  message: "user registered successfully"})
            }
            return res.send({success : false, message: "error in saving the data"})
        } catch (error) {
            console.error("Error occurred during registration:", error);
            return res.status(500).send({ success: false, message: "Error occurred during registration" });
        }
    },

    login: async(req,res,next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },

    logout: async(req,res,next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
};