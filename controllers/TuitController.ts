import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {

    private static instance: TuitController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    private constructor() {
    }

    public static getInstance = (app: Express): TuitController => {
        if (TuitController.instance === null) {
            TuitController.instance = new TuitController();

            app.get('/tuits', TuitController.instance.findAllTuits);
            app.get('/tuits/:tuitId', TuitController.instance.findTuitById);
            app.get('/users/:userId/tuits', TuitController.instance.findTuitsByUser);
            app.post('/tuits', TuitController.instance.createTuit);
            app.put('/tuits/:tuitId', TuitController.instance.updateTuit);
            app.delete('/tuits/:tuitId', TuitController.instance.deleteTuit);
        }

        return TuitController.instance;
    }




    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    
    findTuitById = (req: Request, res: Response) =>
    TuitController.tuitDao.findTuitById(req.params.tuitId)
            .then(tuit => res.json(tuit));
    
    findTuitsByUser = (req: Request, res: Response) =>
    TuitController.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuit => res.json(tuit));
    
    createTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    
    updateTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.updateTuit(req.params.tuitId, req.body)
            .then(status => res.json(status));
    
    deleteTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.deleteTuit(req.params.tuitId)
            .then(status => res.json(status));
}