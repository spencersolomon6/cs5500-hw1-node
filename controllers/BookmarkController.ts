import bodyParser from "body-parser";
import { Request, Response, Express } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @file This class exposes RESTful API endpoints for the bookmark resource. 
 * Defines the following endpoints:
 * <ul>
 *      <li>POST /api/bookmarks/:uid/tuits/:tid to create a new bookmarked tuit for the given user
 *      </li>
 *      <li>DELETE /api/bookmarks/:uid/tuits/:tid to delete a new bookmarked tuit for the given user
 *      </li>
 *      <li>GET /api/bookmarks/:uid to retreive all tuits bookmarked by the given user
 *      </li>
 *      <li>GET /api/bookmarks/:tid to retreive all users who have bookmarked a given tuit
 *      </li>
 *      <li>GET /api/bookmarks/:uid/tuits/:tid to retreive all bookmarks in the system
 *      </li>
 * </ul>
 * @property {BookmarkController} instance A Singleton Controller implementing the RESTful API for the bookmark resource
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing CRUD operations for the bookmark resource 
 */
export default class BookmarkController implements BookmarkControllerI {
    private static instance: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    /**
     * Returns a singleton instance of the BookmarkController which supplies RESTful API endpoints for the bookmark resource
     * @param app Express instance to declare the API
     * @returns BookmarkController instance
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.instance === null) {
            BookmarkController.instance = new BookmarkController();

            app.post("/api/bookmarks/:uid/tuits/:tid", BookmarkController.instance.userBookmarksTuit);
            app.delete("/api/bookmarks/:uid/tuits/:tid", BookmarkController.instance.userUnbookmarksTuit);
            app.get("/api/bookmarks/:uid", BookmarkController.instance.findBookmarkedTuits);
            app.get("/api/bookmarks/:tid", BookmarkController.instance.findBookmarkedByUsers);
            app.get("/api/bookmarks", BookmarkController.instance.findAllBookmarks);
        }

        return BookmarkController.instance;
    }

    /**
     * Records that a user bookmarked a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user performing the operation and
     * tid representing the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Bookmark object
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
        .userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    
    /**
     * Records that a user unbookmarked a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user performing the operation and
     * tid representing the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the status of the delete operation
     */            
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
        .userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
    
    /**
     * Retreives all tuits bookmarked by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Bookmark objects
     */            
    findBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
        .findBookmarkedTuits(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
    
    /**
     * Retreives all users who have bookmarked a tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Bookmark objects
     */            
    findBookmarkedByUsers = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
        .findBookmarkedByUsers(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    
    /**
     * Retreives all Bookmarks from the system
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Bookmark objects
     */            
    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
        .findAllBookmarks()
            .then(bookmarks => res.json(bookmarks));
}