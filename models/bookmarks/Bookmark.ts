/**
 * @file Encapsulates the data type representing relationship between a User and a Tuit,
 * as in a User bookmarks a Tuit
 */
 import User from '../users/User';
 import Tuit from '../tuits/Tuit';

 /**
  * @typedef Bookmark Represents follows relationship between a User and a Tuit,
  * as in a User bookmarks a Tuit
  * @property {User} bookmarkedBy User bookmarking the tuit
  * @property {Tuit} bookmarkedTuit Tuit being bookmarked
  */
 export default interface Bookmark {
     bookmarkedBy: User,
     bookmarkedTuit: Tuit
 }