import {Request, Response} from "express";

/**@file declares RESTful API endpoints for the dislike resource */

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    countHowManyDislikedTuit (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
};