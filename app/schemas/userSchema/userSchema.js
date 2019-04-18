import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import to from 'await-to-js';

import * as validators from './validators';


export const createUserSchema = ({
  authenticationService,
}) => {
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

    const hashedPassword = await authenticationService.hashPassword(user.password);

    user.password = hashedPassword;
  });

  // it's funny, that during so long time
  // mongoose doesn't have the way properly handle this case:
  // https://github.com/Automattic/mongoose/issues/4575
  userSchema.pre('findOneAndUpdate', async function (next) { 
    const { password } = this.getUpdate();

    if (!password) { return next(); }

    const hashedPassword = await authenticationService.hashPassword(password);

    this.getUpdate().password = hashedPassword;
  });

  userSchema.methods.toClient = function() {
    const user = this.toJSON(); 

    user.id = user._id;

    delete user._id;
    delete user.password;

    return user;
  };

  return userSchema;
};
