const { Post, User } = require('../models')

const postController = {
  // GET all Posts
  getAllPosts(req, res) {
    Post.find()
      .sort({ createdAt: -1 })
      .then((allPosts) => {
        res.json(allPosts)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // GET a single post
  getSinglePost(req, res) {
    Post.findOne({ _id: req.params.PostId })
      .then((singlePost) => {
        if (!singlePost) {
          return res
            .status(404)
            .json({ message: 'No Post found in the database with this id.' })
        }
        res.json(singlePost)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // POST a new post
  createSinglePost(req, res) {
    Post.create(req.body)
      .then((newPost) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { Posts: newPost._id } },
          { new: true }
        )
      })
      .then((singlePost) => {
        if (!singlePost) {
          return res.status(404).json({
            message:
              'New post was created but no corresponding user was found in the database.',
          })
        }

        res.json({ message: 'successfully created a new post' })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // update Post
  updateSinglePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.PostId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((existingPost) => {
        if (!existingPost) {
          return res
            .status(404)
            .json({ message: 'No Post found in the database with this id.' })
        }
        res.json(existingPost)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // delete a single Post
  deleteSinglePost(req, res) {
    Post.findOneAndRemove({ _id: req.params.PostId })
      .then((singlePost) => {
        if (!singlePost) {
          return res
            .status(404)
            .json({ message: 'No Post found in the database with this id.' })
        }

        // remove Post id from user's `Posts` field
        return User.findOneAndUpdate(
          { Posts: req.params.PostId },
          { $pull: { Posts: req.params.PostId } },
          { new: true }
        )
      })
      .then((singlePost) => {
        if (!singlePost) {
          return res.status(404).json({
            message:
              'Post was deleted but the corresponding user is not found.',
          })
        }
        res.json({ message: 'Successfully deleted post.' })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // ADD a new reaction to a single post
  addNewReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.PostId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((existingPost) => {
        if (!existingPost) {
          return res
            .status(404)
            .json({ message: 'No Post found in the database with this id.' })
        }
        res.json(existingPost)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // remove a single reaction from a single post
  removeSingleReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.PostId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((updatedPost) => {
        if (!updatedPost) {
          return res
            .status(404)
            .json({ message: 'No Post found in the database with this id.' })
        }
        res.json(updatedPost)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
}

module.exports = postController
