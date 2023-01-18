const { User, Post } = require('../models')

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .then((allUsers) => {
        res.json(allUsers)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // GET a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('Posts')
      .then((singleUser) => {
        if (!singleUser) {
          return res.status(404).json({ message: 'No user with this id!' })
        }
        res.json(singleUser)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // POST a new user
  postNewUser(req, res) {
    User.create(req.body)
      .then((newUser) => {
        res.json(newUser)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // UPDATE a single user
  updateSingleUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((existingUser) => {
        if (!existingUser) {
          return res
            .status(404)
            .json({ message: 'No user found in the database with this id.' })
        }
        res.json(existingUser)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // Delete a single user
  deleteSingleUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((existingUser) => {
        if (!existingUser) {
          return res.status(404).json({ message: 'No user found.' })
        }
        // finding the corresponding User's posts and deleting them along with the user account.
        return Post.deleteMany({ _id: { $in: existingUser.Posts } })
      })
      .then(() => {
        res.json({ message: 'User account deleted.' })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // ADD User to friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((newFriend) => {
        if (!newFriend) {
          return res
            .status(404)
            .json({ message: 'No user found in the database.' })
        }
        res.json(newFriend)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // REMOVE user from friend list
  removeSingleFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((removedFriend) => {
        if (!removedFriend) {
          return res
            .status(404)
            .json({ message: 'No user found in the database.' })
        }
        res.json(removedFriend)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
}

module.exports = userController
