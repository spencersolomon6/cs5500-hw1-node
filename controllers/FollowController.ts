import {Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @file FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:followingid/follows/:followedid to record that a user follows 
 *     another user </li>
 *     <li>DELETE /api/users/:followingid/follows/:followedid to record that a user 
 *     unfollowed another user </li>
 *     <li>GET /api/users/:uid/follows to find all users following a given user
 *     </li>
 *     <li>GET /api/follows/:uid to find all users that this user follows
 *     </li>
 *     <li>GET /api/follows/:followingid1/follows/:followingid2 to find all users followed by 
 *     both the given users </li>
 *     <li> GET /api/follows to find all follows relationships in the system
 *     </li>
 * </ul>
 * 
 * @property {FollowDao} followDao Singleton DAO implementing CRUD for follows
 * @property {FollowController} instance Singleton Controller implementing RESTful API
 */
export default class FollowController implements FollowControllerI {
    
    private static instance: FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    /**
     * Creates singleton instance of the FollowController class
     * @param app Express instance to declare the API
     * @returns FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.instance === null) {
            FollowController.instance = new FollowController();

            app.post("/api/users/:followingid/follows/:followedid", FollowController.instance.userFollowsUser);
            app.delete("/api/users/:followingid/follows/:followedid", FollowController.instance.userUnfollowsUser);
            app.get("/api/users/:uid/follows", FollowController.instance.findFollowedBy);
            app.get("/api/follows/:uid", FollowController.instance.findFollowing);
            app.get("/api/follows/:followingid1/follows/:followingid2", FollowController.instance.findBothFollowing);
            app.get("/api/follows", FollowController.instance.findAllFollows);
        }

        return FollowController.instance;
    }

    private constructor() { };

    /**
     * Records that a user followed another user
     * @param {Request} req Represents request from client, including the path
     * parameter followingid representing the user performing the operation and
     * followedid representing the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Follow object
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
        .userFollowsUser(req.params.followingid, req.params.followedid)
            .then(follow => res.json(follow));
    
    /**
     * Removes a follow relationship between two users
     * @param {Request} req Represents request from client, including the path
     * parameter followingid representing the user performing the operation and
     * followedid representing the user being unfollowed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the status of the delete operation
     */        
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
        .userUnfollowsUser(req.params.followingid, req.params.followedid)
            .then(status => res.json(status));
    
    /**
     * Retreives all users who are followed by both of the given users
     * @param {Request} req Represents request from client, including the path
     * parameter followingid1 representing the first user and
     * followingid2 representing the second user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Follow objects
     */            
    findBothFollowing = (req: Request, res: Response) =>
        FollowController.followDao
        .findBothFollowing(req.params.followingid1, req.params.followingid2)
            .then(follows => res.json(follows));
    
    /** 
     * Retreives all users which are following the given user
     * @param {Request} req Represents request from client, including the path
     * parameter followingid representing the user performing the operation
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Follow objects
     */
    findFollowing = (req: Request, res: Response) =>
        FollowController.followDao
        .findFollowing(req.params.uid)
            .then(follows => res.json(follows));
    
    /**
     * Retreives all user which are followed by the given user
     * @param {Request} req Represents request from client, including the path
     * parameter followingid representing the user performing the operation
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Follow objects
     */            
    findFollowedBy = (req: Request, res: Response) =>
        FollowController.followDao
        .findFollowedBy(req.params.uid)
            .then(follows => res.json(follows));
    
    /**
     * Retreives all Follows in the system
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Follow objects
     */                        
    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao
        .findAllFollows()
            .then(follows => res.json(follows));
    

    


}