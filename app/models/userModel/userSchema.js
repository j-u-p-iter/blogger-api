import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import to from 'await-to-js';

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

userSchema.pre('save', async function (next) { 
  const user = this;

  if (!user.isModified('password')) { return next(); }

  const [error, hashedPassword] =  await to(bcrypt.hash(user.password, 10)); 

  if (error) { throw new Error(error.message); }

  user.password = hashedPassword;
});

userSchema.methods.toClient = function() {
  const user = this.toJSON(); 

  user.id = user._id;

  delete user._id;
  delete user.password;

  return user;
};


export default userSchema;
