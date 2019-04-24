import mongoose from 'mongoose';

import * as validators from './validators';


export const createPostSchema = () => {
  const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [
        true,
        'Post should have title',
      ],
      trim: true,
      validate: validators.titleValidator,
    },
    body: {
      type: String,
      required: [
        true,
        'Post without content is not post at all ;)'
      ],
      trim: true,
      validate: validators.bodyValidator,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  return postSchema;
};
