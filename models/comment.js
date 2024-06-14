import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    author: {type: Schema.Types.ObjectId},
    text: {type: String, required: true, minLength: 1, maxLength: 200},
    date: {type: Schema.Types.Date},
    post: {type: Schema.Types.ObjectId}
});
const CommentModel = mongoose.model('comments', CommentSchema);

export default CommentModel;