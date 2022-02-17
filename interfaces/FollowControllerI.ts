import {Request, Response} from "express";

/**
 * @file Declares RESTful API for follows resource
 */
export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    findBothFollowing (req: Request, res: Response): void;
    findFollowing (req: Request, res: Response): void;
    findFollowedBy (req: Request, res: Response): void;
    findAllFollows (req: Request, res: Response): void;
};