const postRouter = require('express').Router()
const {
  getAllPosts,
  getSinglePost,
  createSinglePost,
  updateSinglePost,
  deleteSinglePost,
  addNewReaction,
  removeSingleReaction,
} = require('../../controllers/postController')

// /api/Posts
// get all posts
// post a new post
postRouter.route('/').get(getAllPosts).post(createSinglePost)

// /api/Posts/:PostId
// get single post
// update a single post
// delete a single post
postRouter
  .route('/:postId')
  .get(getSinglePost)
  .put(updateSinglePost)
  .delete(deleteSinglePost)

// /api/Posts/:PostId/reactions
// add a new reaction to a post
postRouter.route('/:postId/reactions').post(addNewReaction)

// /api/Posts/:PostId/reactions/:reactionId
// remove a single reaction from a user's post
postRouter.route('/:postId/reactions/:reactionId').delete(removeSingleReaction)

module.exports = postRouter
