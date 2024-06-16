import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    image: {type: String},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Schema.Types.Date},
    published: {type: Schema.Types.Boolean},
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
