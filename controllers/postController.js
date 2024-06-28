import Post from '../models/post.js';
import Comment from '../models/comment.js';
import asyncHandler from 'express-async-handler';
import {body, validationResult} from 'express-validator';


const validationAndSanitationMiddlewareFns = [
    body('tag').toArray(),
    body('image').optional({ values: 'falsy'}).trim().escape(),
    body('title').isLength({min: 1, max: 250}).trim().escape(),
    body('text').escape(),
    body('authorName').trim().escape(),
    body('imageOwner').optional({ values: 'falsy'}).trim().escape(),
    body('date').toDate(),
]
//TODO: pagination/caching
// GET: all posts
export const post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({published: "on"}).sort({date: -1}).exec();
    res.status(200).json({allPosts});
});

//GET: specific post
export const post_detail = asyncHandler(async (req, res, next) => {
    const [post, allCommentsOnPost] = await Promise.all([
        Post.findById(req.params.postid).populate(['tag', {path: 'author', select: 'id username roles'}]).exec(),
        Comment.find({post: req.params.postid}).sort({date: -1}).exec()
    ]);
    res.status(200).json({post, allCommentsOnPost});
});


//POST: create post - protected with JWT
export const post_create = [
    ...validationAndSanitationMiddlewareFns,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({sanitizedInputs: req.body, errors: errors})
        } else {
            const postCreationStatus = await Post.create({
                author: req.body.userid, //TODO: make sure to create a hidden input with userid set as value or..
                authorName: req.body.authorName,
                image: req.body.image,
                imageOwner: req.body.imageOwner,
                title: req.body.title,
                text: req.body.text,
                date: req.body.date,
                published: req.body.published,
                tag: req.body.tag
            })
            res.status(200).json({id: postCreationStatus._id});
        }
})];


//PUT: update post - protected with JWT
export const post_update = [
    ...validationAndSanitationMiddlewareFns,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            res.status(400).json({sanitizedInputs: req.body, errors: errors});
        } else {
            const post = new Post({
                _id: req.params.postid,
                author: req.body.userid, //TODO: make sure to create a hidden input with userid set as value or..
                authorName: req.body.authorName,
                image: req.body.image,
                imageOwner: req.body.imageOwner,
                title: req.body.title,
                text: req.body.text,
                date: req.body.date,
                published: req.body.published,
                tag: req.body.tag
            })
            const updatedPost = await Post.findByIdAndUpdate(req.params.postid, post, {new: true});
            res.status(200).json({updatedPost});
        }
    })
]

//DELETE: delete post - protected with JWT
export const post_delete = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.postid);
    res.status(200).json(null);
})

