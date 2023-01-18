const userRouter = require('express').Router()
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  removeSingleFriend,
} = require('../../controllers/userController')

// /api/users
// get all users
// post a new user
userRouter.route('/').get(getAllUsers).post(postNewUser)

// /api/users/:userId
// get single user
// update a single user
// delete a single user
userRouter
  .route('/:userId')
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser)

// /api/users/:userId/friends-list/:friendId
// add a user to a friend's list
// remove a single user from a user's friend's list
userRouter
  .route('/:userId/friends-list/:friendId')
  .post(addFriend)
  .delete(removeSingleFriend)

module.exports = userRouter
