/**
 * @file Implements mongoose schema for follows
 */

 import mongoose from "mongoose";
 import Follow from "../../models/follows/Follow";
 import User from "../../models/User";
 
 /**
  * @typedef Follow Represents following relationship between two users
  * @property {User} userFollowed User being followed
  * @property {User} userFollowing User following the other User
  */
 const FollowSchema = new mongoose.Schema<Follow>({
     userFollowed: User,
     userFollowing: User
 }, {collection: "follows"});
 export default FollowSchema;