import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: true, minLength: 1, maxLength: 200},
    date: {type: Schema.Types.Date},
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
});
const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;