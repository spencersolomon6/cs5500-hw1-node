"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TuitController {
    constructor(app, tuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitId', this.findTuitById);
        this.app.get('/users/:userId/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.put('/tuits/:tuitId', this.updateTuit);
        this.app.delete('/tuits/:tuitId', this.deleteTuit);
    }
    findAllTuits(req, res) {
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    }
    findTuitById(req, res) {
        this.tuitDao.findTuitById(req.params.tuitId)
            .then(tuit => res.json(tuit));
    }
    findTuitsByUser(req, res) {
        this.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuit => res.json(tuit));
    }
    createTuit(req, res) {
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    }
    updateTuit(req, res) {
        this.tuitDao.updateTuit(req.params.tuitId, req.body)
            .then(status => res.json(status));
    }
    deleteTuit(req, res) {
        this.tuitDao.deleteTuit(req.params.tuitId)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
