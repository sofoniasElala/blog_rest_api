import Tag from '../models/tag.js';
import Post from '../models/post.js'
import asyncHandler from 'express-async-handler';
import {body, validationResult} from 'express-validator';

//GET: all tags
export const tag_list = asyncHandler(async (req, res, next) => {
    const allTags = await Tag.find().exec();
    res.status(200).json({allTags});
});

//GET: specific tag + posts
export const tag_posts_list = asyncHandler(async (req, res, next) => {
    const [tag, allPostsOnTag] = await Promise.all([
        Tag.findById(req.params.tagid).exec(),
        Post.find({tag: req.params.tagid}).sort({date: 1}).exec()
    ]);
    res.status(200).json({tag, allPostsOnTag});
});

//POST: create tag
export const tag_create = [
    body('name').trim().isLength({min: 1}).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({sanitizedInputs: req.body, errors: errors});
        } else {
            const tagCreationStatus = await Tag.create({
                name: req.body.name
            });
            res.status(200).json({id: tagCreationStatus._id});
        }
    })
]

//PUT: update tag
export const tag_update = [
    body('name').trim().isLength({min: 1}).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({sanitizedInputs: req.body, errors: errors});
        } else {
            const tag = new Tag({
                name: req.body.name
            });
            const updatedTag = await Tag.findByIdAndUpdate(req.params.tagid, tag, {new: true});
            res.status(200).json({updatedTag});
        }
    })
];

//DELETE: delete tag
export const tag_delete = asyncHandler(async (req, res, next) => {
    await Tag.findByIdAndDelete(req.params.tagid);
    res.status(200).json(null);
})