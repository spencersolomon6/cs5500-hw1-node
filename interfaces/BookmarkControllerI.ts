import {Request, Response} from 'express';

/**
 * @file Declares the RESTful API for bookmark resource
 */
export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findBookmarkedTuits(req: Request, res: Response): void;
    findBookmarkedByUsers(req: Request, res: Response): void;
    findAllBookmarks(req: Request, res: Response): void;
}