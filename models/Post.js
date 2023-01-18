const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')

const postSchema = new Schema(
  {
    bodyText: {
      type: String,
      required: 'Post cannot be empty!',
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

const Post = model('Post', postSchema)

module.exports = Post
