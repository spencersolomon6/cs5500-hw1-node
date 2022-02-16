import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkModel = mongoose.model<Bookmark>(
    "BookmarkModel",
    BookmarkSchema
);
export default BookmarkModel;
