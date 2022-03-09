const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

//Init bcryptjs
const bcryptjs = require('bcryptjs');

//util
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

//Get all User
exports.getAllUser = catchAsync (async (req, res, next) => {
  const user = await User.findAll({
    Where: {status: 'active'},
    include: [
      {
      model: Post,
      include: [{
        model: Comment
      }]
    }
  ]
  });
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}) ;

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, status: 'active' },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment
          }
        ]
      }
      //,
      //{ model: Comment, include: [{ model: Post }] }
    ]
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }
  
  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync (async (req, res) => {
  const { userName, email, password } = req.body

  let passwordHash = await bcryptjs.hash(password, 8)

  const newUser = await User.create({
    userName: userName,
    email: email,
    password: passwordHash
  })

  res.status(201).json({
    status: 'success',
    message: 'The new User was created succesfully'
  })
})

//exports.viewUser = async (req, res) => {
//  try {
//    const { userName, password } = req.body
//    const userLog = await User.afterValidate({
//      userName: userName,
//    })
//    res.status(201).json({
//      status: 'success',
//      message: "Welcome to userName "
//    })
//  } catch (error) {
//    console.log(error)
//  }
//}