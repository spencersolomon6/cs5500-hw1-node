"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(app, userDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('users/:userid', this.findUserById);
        this.app.post('users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
    findAllUsers(req, res) {
        this.userDao.findAllUsers()
            .then(users => res.json(users));
    }
    findUserById(req, res) {
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
    }
    createUser(req, res) {
        this.userDao.createUser(req.body)
            .then(user => res.json(user));
    }
    deleteUser(req, res) {
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
    }
    updateUser(req, res) {
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
