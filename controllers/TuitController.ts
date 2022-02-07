import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {

    app: Express;
    tuitDao: TuitDao;

    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;

        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitId', this.findTuitById);
        this.app.get('/users/:userId/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.put('/tuits/:tuitId', this.updateTuit);
        this.app.delete('/tuits/:tuitId', this.deleteTuit);
    }


    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuitId)
            .then(tuit => res.json(tuit));
    
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuit => res.json(tuit));
    
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tuitId, req.body)
            .then(status => res.json(status));
    
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuitId)
            .then(status => res.json(status));
}