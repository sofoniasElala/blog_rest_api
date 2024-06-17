import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    name: {type: String, required: true, minLength: 1}
});
const TagModel = mongoose.model('Tag', TagSchema);

export default TagModel;