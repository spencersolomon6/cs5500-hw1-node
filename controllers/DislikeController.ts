/**
 * @file Controller RESTful Web service API for dislike resource
 */
 import {Express, Request, Response} from "express";
 import { ParamsDictionary } from "express-serve-static-core";
 import { ParsedQs } from "qs";
 import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
 import DislikeControllerI from "../interfaces/DislikeControllerI";
 
 /**
  * @class DislikesController Implements RESTful Web service API for dislikes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
  *     no londer dislikes a tuit</li>
  * </ul>
  * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
  * @property {DislikeController} DislikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikeController implements DislikeControllerI {
     private static dislikeDao: DislikeDao = DislikeDao.getInstance();
     private static dislikeController: DislikeController | null = null;
     private static likeDao: LikeDao = LikeDao.getInstance();
     private static tuitDao: TuitDao = TuitDao.getInstance();
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): DislikeController => {
         if(DislikeController.dislikeController === null) {
             DislikeController.dislikeController = new DislikeController();
             app.get("/api/users/:uid/Dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
             app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
             app.get("/api/tuits/:tid/dslikes/count", DislikeController.dislikeController.countHowManyDislikedTuit);
             app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
             app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
             app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
        }
         return DislikeController.dislikeController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that disliked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the disliked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
             .then(dislikes => res.json(dislikes));
 
     /**
      * Retrieves all tuits disliked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were disliked
      */
     findAllTuitsDislikedByUser = (req: Request, res: Response) =>
         DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
             .then(dislikes => res.json(dislikes));
 
     /**
      * Retrieves the count of how many users dsliked a given tuit
      * @param {Request} req Represents request from client including the path
      * paramter tid representing the tuit to find the dislike count of 
      * @param {Response} res Represents response to client, including the body
      * formatted as JSON containing the dislike count   
      */
     countHowManyDislikedTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.countHowManyDislikedTuit(req.params.tid)
             .then(count => res.json(count));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new dislikes that was inserted in the
      * database
      */
     userDislikesTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
             .then(dislikes => res.json(dislikes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being undisliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the dislike was successful or not
      */
     userUndislikesTuit = (req: Request, res: Response) =>
         DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the path parameters
     * uid and tid representing the user that is disliking the tuit and the tuit being disliked 
     * @param {Response} res Represents the response to the client, either a 200 code for
     * a success of the operation or a 404 for an error 
     */
     userTogglesTuitDislikes = async (req: any, res: any) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
              profile._id : uid;

        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const userAlreadyLikedTuit = await DislikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyDislikedTuit: number = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            const howManyLikedTuit: number = await DislikeController.likeDao
                .countHowManyLikedTuit(tid);
            const tuit = await DislikeController.tuitDao
                .findTuitById(tid);

            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.likes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.likes = howManyDislikedTuit + 1;
                if (userAlreadyDislikedTuit) {
                    await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
            };
            await DislikeController.tuitDao.updateDislikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
 };