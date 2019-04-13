import mongoose from 'mongoose';

import * as validators from './validators';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Tell us, what is your name, bro)',
    ],
    unique: true,
    trim: true,
    validate: validators.nameValidator,
  },
  email: {
    type: String,
    required: [true, 'We need your email, man. Spam is waiting for you)'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: validators.emailValidator,
  },
  role: {
    type: String,
    default: 'user',
    validate: validators.roleValidator,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'No password, no enter ;)'],
    validate: validators.passwordValidator,
  },
}, { timestamps: true });

userSchema.methods.toClient = function() {
  const user = this.toJSON(); 

  user.id = user._id;

  delete user._id;
  delete user.password;

  return user;
};


export default userSchema;
