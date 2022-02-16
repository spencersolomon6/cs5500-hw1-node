import mongoose from "mongoose";
import Tuit from "../models/tuits/Tuit";
import User from "../models/users/User";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: String, required: true},
    likes: {type: Number, default: 0},
    replies: {type: Array, default: []},
    likedByUsers: {type: Array, default: []},
    tags: {type: Array, default: []},
    topics: {type: Array, default: []}
}, {collection:"tuits"});
export default TuitSchema;