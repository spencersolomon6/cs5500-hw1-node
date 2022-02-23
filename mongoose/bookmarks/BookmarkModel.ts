import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * A mongoose Model built using the BookmarkSchema
 */
const BookmarkModel = mongoose.model<Bookmark>(
    "BookmarkModel",
    BookmarkSchema
);
export default BookmarkModel;
