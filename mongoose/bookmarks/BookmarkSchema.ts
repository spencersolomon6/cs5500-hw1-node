/**
 * @file Implements mongoose schema for bookmarks
 */

 import mongoose from "mongoose";
 import Bookmark from "../../models/bookmarks/Bookmark";
 import User from "../../models/User";
 import Tuit from "../../models/Tuit";
 
/**
  * @typedef Bookmark Represents follows relationship between a User and a Tuit,
  * as in a User bookmarks a Tuit
  * @property {User} bookmarkedBy User bookmarking the tuit
  * @property {Tuit} bookmarkedTuit Tuit being bookmarked
  */
 const BookmarkSchema = new mongoose.Schema<Bookmark>({
     bookmarkedBy: User,
     bookmarkedTuit: Tuit
 }, {collection: "bookmarks"});
 export default BookmarkSchema;