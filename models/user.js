import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true, minLength: 3, maxLength: 20},
    password: {type: String, required: true},
    roles: [{type: String}]
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;