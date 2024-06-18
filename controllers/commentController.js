import Comment from '../models/comment.js';
import asyncHandler from 'express-async-handler';
import {body, validationResult} from 'express-validator';

//GET: all comments of a post
export const comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({post: req.params.postid}).sort({date: -1}).exec();
    res.status(200).json({allComments});
});

//GET: specific comment
export const comment_detail = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid).exec();
    res.status(200).json({comment});
});

//POST: create comment
export const comment_create = [
    body('text').escape(),
    body('date').toDate(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           res.status(400).json({sanitizedInputs: req.body, errors: errors});
        } else {
            const commentCreationStatus = await Comment.create({
                author: req.body.userid, //TODO: make sure to create a hidden input with userid set as value or..
                text: req.body.text,
                date: req.body.date,
                post: req.params.postid
            });
            res.status(200).json({id: commentCreationStatus._id});
        }
    })
];

//PUT: update comment - protected with JWT
export const comment_update = [
    body('text').escape(),
    body('date').toDate(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           res.status(400).json({sanitizedInputs: req.body, errors: errors});
        } else {
            const comment = new Comment({
                _id: req.params.commentid,
                author: req.body.userid, //TODO: make sure to create a hidden input with userid set as value or..
                text: req.body.text,
                date: req.body.date,
                post: req.params.postid
            });
            const updatedComment = await Comment.findByIdAndUpdate(req.params.commentid, comment, {new: true});
            res.status(200).json({updatedComment});
        }
    })
]

//DELETE: delete comment - protected with JWT
export const comment_delete = asyncHandler(async (req, res, next) => {
    await Comment.findByIdAndDelete(req.params.commentid);
    res.status(200).json(null);
})