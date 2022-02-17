import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares the CRUD operations for bookmark resources
 */
export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findBookmarkedTuits(uid: string): Promise<Bookmark[]>;
    findBookmarkedByUsers(tid: string): Promise<Bookmark[]>;
    findAllBookmarks(): Promise<Bookmark[]>;
}