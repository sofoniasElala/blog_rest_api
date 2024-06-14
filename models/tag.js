import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    name: {type: String}
});
const TagModel = mongoose.model('tags', TagSchema);

export default TagModel;