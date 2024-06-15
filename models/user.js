import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true, minLength: 3, maxLength: 10},
    password: {type: String, required: true},
    roles: [{type: String}]
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;