import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId},
    image: {type: String},
    text: {type: String, required: true},
    date: {type: Schema.Types.Date},
    tag: [{type: Schema.Types.ObjectId}]
});
const PostModel = mongoose.model('posts', PostSchema);

export default PostModel;
