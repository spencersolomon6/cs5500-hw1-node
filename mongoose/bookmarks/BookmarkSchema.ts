/**
 * @file Implements mongoose schema for bookmarks
 */

 import mongoose, {Schema} from "mongoose";
 import Bookmark from "../../models/bookmarks/Bookmark";
 
/**
  * @typedef Bookmark Represents follows relationship between a User and a Tuit,
  * as in a User bookmarks a Tuit
  * @property {User} bookmarkedBy User bookmarking the tuit
  * @property {Tuit} bookmarkedTuit Tuit being bookmarked
  */
 const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
 }, {collection: "bookmarks"});
 export default BookmarkSchema;