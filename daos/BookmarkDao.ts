import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static instance: BookmarkDao | null = null;

    public static getInstance(): BookmarkDao {
        if (BookmarkDao.instance === null) {
            BookmarkDao.instance = new BookmarkDao();
        }

        return BookmarkDao.instance;
    }

    private constructor() { }

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy:uid, bookmarkedTuit:tid});    
    
    findBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({bookmarkedBy:uid})
        .populate("bookmarkedTuit")
        .exec();

    findBookmarkedByUsers = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({bookmarkedTuit:tid})
        .populate("bookmarkedBy")
        .exec();

    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel
        .find()
        .populate("bookmarkedBy", "bookmarkedTuit")
        .exec();
}