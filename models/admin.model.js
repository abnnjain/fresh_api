const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../helpers/init_mongoDB');
const bcrypt = require('bcrypt')

const adminUserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type: String,
    }
});

adminUserSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

adminUserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        next(error)
    }
};

const Admin = mongoose.model('admin', adminUserSchema);

module.exports = Admin;