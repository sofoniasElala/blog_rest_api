import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    authorName: {type: String, default: 'Anonymous'},
    image: {type: String},
    imageOwner: {type: String, default: "Unknown"},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Schema.Types.Date},
    published: {type: Schema.Types.Boolean, default: "off"},
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
