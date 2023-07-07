const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
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
        value: String,
    }
});

UserSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
    //   const hashedEmail = await bcrypt.hash(this.email, salt);
      const hashedPassword = await bcrypt.hash(this.password, salt);
    //   this.email = hashedEmail;
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

UserSchema.methods.isValidEmail = async function (email) {
    try {
        await bcrypt.compare(email, this.email)
        if (email === this.email) return true
    } catch (error) {
        next(error)
    }
};

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        next(error)
    }
};

const User = mongoose.model('user', UserSchema);

module.exports = User