import User from '../models/user.js';
import Post from '../models/post.js';
import asyncHandler from 'express-async-handler';
import {body, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';


const validationAndSanitationMiddlewareFns = [
    body('username').trim().isLength({ min: 3, max: 20 }).escape().custom(asyncHandler(async value => {
        const userExists = await User.find({'username': value}).exec();
        if (userExists.length !== 0) {
          throw new Error('Username already in use');
        }
    })),
    body('password').trim().escape().isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'), 
    body('passwordConfirmation').trim().escape().custom((value, { req }) => {
    return value === req.body.password;
    }).withMessage('Passwords must match'), 
    body('roles.*').escape(),
]


//GET: all users
export const user_list = asyncHandler(async (req, res, next) => {
    const allUsers = User.find().sort({role: 1}).exec();
    res.status(200).json({allUsers});
})

// GET:  detail page for a specific user.
export const user_detail = asyncHandler(async (req, res, next) => {
    const [user, allPostByUser] = await Promise.all([
        User.findById(req.params.userid).select('username roles').exec(),
        Post.find({author: req.params.userid}).sort({date: -1}).exec()
    ]);

    res.status(200).json({user, allPostByUser});

});

// POST: create user
export const user_create = [
    ...validationAndSanitationMiddlewareFns,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({success: false, sanitizedInputs: req.body, errors: errors.array()[0].msg})
        } else {
            const userCreationStatus = await User.create({
                username: req.body.username, 
                password: await bcrypt.hash(req.body.password, 10),
                roles: req.body.roles
            });
            res.status(200).json({id: userCreationStatus._id});
        }
    })

];

//PUT: update user - protected with JWT
export const user_update = [
    ...validationAndSanitationMiddlewareFns,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({success: false, sanitizedInputs: req.body, errors: errors.array()[0].msg})
        } else {
            const originalUserData = await User.findOne({_id: req.params.userid}, 'password').exec();
            const updatedPassword = bcrypt.compare(req.body.password, originalUserData.password) ? originalUserData.password : await bcrypt.hash(req.body.password, 10);
            const user = new User({
                _id: req.params.userid,
                username: req.body.username, 
                password:  updatedPassword,
                roles: req.body.roles
            });
            const updatedUser = await User.findByIdAndUpdate(req.params.userid, user, {new: true})
            res.status(200).json({id: updatedUser._id});
        }
    })
];

//DELETE: delete user - protected with JWT
export const user_delete = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json({success: true});
})