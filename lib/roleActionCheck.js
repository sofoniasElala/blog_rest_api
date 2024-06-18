import asyncHandler from "express-async-handler";

//req.user._id is an objectId object so req.user.id is used to access the actual id
export const isAdmin = asyncHandler(async (req, res, next) => {
    if(!(req.user && req.user.roles.includes('admin'))){
        res.status(401).json({message: 'you\'re not authorized to access this resource'})
    }  else {next() }
});

export const isTheSameUser = asyncHandler(async (req, res, next) => {
    if(!(req.user && req.user.id === req.body.userid)){
        res.status(401).json({message: 'you\'re not authorized to access this resource'})
    }  else {next() }
});

export const isTheSameUserOrAdmin = asyncHandler(async (req, res, next) => {
    if(!(req.user && (req.user.id === req.body.userid||req.user.roles.includes('admin')))){
        res.status(401).json({message: 'you\'re not authorized to access this resource'})
    }  else {next() }
});

export const isTheSameUserOrAdminOnParams = asyncHandler(async (req, res, next) => {
    if(!(req.user && (req.user.id === req.params.userid||req.user.roles.includes('admin')))){
        res.status(401).json({message: 'you\'re not authorized to access this resource'})
    } else {next() }
});
